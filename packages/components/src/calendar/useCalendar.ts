import { ref, computed, reactive } from 'vue';
import dayjs, { Dayjs } from 'dayjs';

// 日历日期类型
export interface CalendarDate {
  date: Dayjs;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

// 日历配置选项
export interface UseCalendarOptions {
  // 当前选中的日期（单选模式）
  modelValue?: Date | Dayjs | null;
  // 日期范围选择的开始日期
  startDate?: Date | Dayjs | null;
  // 日期范围选择的结束日期
  endDate?: Date | Dayjs | null;
  // 最小可选日期
  minDate?: Date | Dayjs | null;
  // 最大可选日期
  maxDate?: Date | Dayjs | null;
  // 禁用的日期数组
  disabledDates?: (Date | Dayjs)[];
  // 禁用的日期函数
  isDateDisabled?: (date: Dayjs) => boolean;
  // 日期格式化函数
  formatter?: (date: Dayjs) => string;
}

// 返回值类型
export interface UseCalendarReturn {
  // 当前月份的所有日期（7×6矩阵）
  currentMonthDates: CalendarDate[][];
  // 当前年月
  currentYear: number;
  currentMonth: number;
  // 是否为今日
  isToday: (date: Dayjs) => boolean;
  // 是否被禁用
  isDisabled: (date: Dayjs) => boolean;
  // 是否被选中
  isSelected: (date: Dayjs) => boolean;
  // 选择日期
  selectDate: (date: Dayjs) => void;
  // 设置当前年月
  setCurrentMonth: (year: number, month: number) => void;
  // 上一月
  prevMonth: () => void;
  // 下一月
  nextMonth: () => void;
  // 跳转到今天
  goToToday: () => void;
}

/**
 * 日历组合式函数
 * @param options 配置选项
 */
export function useCalendar(options: UseCalendarOptions = {}) {
  // 当前年月
  const currentYear = ref<number>(dayjs().year());
  const currentMonth = ref<number>(dayjs().month() + 1);
  
  // 选中的日期
  const selectedDate = ref<Dayjs | null>(options.modelValue ? dayjs(options.modelValue) : null);
  const startDate = ref<Dayjs | null>(options.startDate ? dayjs(options.startDate) : null);
  const endDate = ref<Dayjs | null>(options.endDate ? dayjs(options.endDate) : null);
  
  // 日期范围选择模式
  const isRangeMode = computed(() => {
    return startDate.value !== null && endDate.value !== null;
  });
  
  // 计算当前月份的日期矩阵（7×6）
  const currentMonthDates = computed<CalendarDate[][]>(() => {
    const year = currentYear.value;
    const month = currentMonth.value;
    
    // 获取当月第一天和最后一天
    const firstDayOfMonth = dayjs(`${year}-${month}-01`);
    const lastDayOfMonth = firstDayOfMonth.endOf('month');
    
    // 获取当月第一天是星期几（0=周日，1=周一...6=周六）
    const firstDayOfWeek = firstDayOfMonth.day();
    
    // 获取上个月需要显示的天数
    const daysFromPrevMonth = firstDayOfWeek;
    
    // 获取下个月需要显示的天数
    const totalDaysInMonth = lastDayOfMonth.date();
    const totalCells = 42; // 7天×6行
    const daysFromNextMonth = totalCells - (daysFromPrevMonth + totalDaysInMonth);
    
    const dates: CalendarDate[] = [];
    
    // 添加上个月的日期
    if (daysFromPrevMonth > 0) {
      const prevMonthLastDay = firstDayOfMonth.subtract(1, 'month').endOf('month');
      for (let i = daysFromPrevMonth; i > 0; i--) {
        const date = prevMonthLastDay.subtract(i - 1, 'day');
        dates.push({
          date,
          isCurrentMonth: false,
          isToday: date.isSame(dayjs(), 'day'),
          isSelected: false,
          isDisabled: isDateDisabled(date)
        });
      }
    }
    
    // 添加当月的日期
    for (let i = 1; i <= totalDaysInMonth; i++) {
      const date = dayjs(`${year}-${month}-${i}`);
      const isSelected = isRangeMode.value 
        ? (startDate.value?.isSame(date, 'day') || endDate.value?.isSame(date, 'day'))
        : selectedDate.value?.isSame(date, 'day');
      
      dates.push({
        date,
        isCurrentMonth: true,
        isToday: date.isSame(dayjs(), 'day'),
        isSelected,
        isDisabled: isDateDisabled(date)
      });
    }
    
    // 添加下个月的日期
    if (daysFromNextMonth > 0) {
      for (let i = 1; i <= daysFromNextMonth; i++) {
        const date = lastDayOfMonth.add(i, 'day');
        dates.push({
          date,
          isCurrentMonth: false,
          isToday: date.isSame(dayjs(), 'day'),
          isSelected: false,
          isDisabled: isDateDisabled(date)
        });
      }
    }
    
    // 转换为7×6矩阵
    const matrix: CalendarDate[][] = [];
    for (let i = 0; i < 6; i++) {
      matrix[i] = dates.slice(i * 7, (i + 1) * 7);
    }
    
    return matrix;
  });
  
  // 判断是否为今日
  const isToday = (date: Dayjs): boolean => {
    return date.isSame(dayjs(), 'day');
  };
  
  // 判断日期是否被禁用
  const isDateDisabled = (date: Dayjs): boolean => {
    // 检查是否在最小/最大日期范围内
    if (options.minDate && date.isBefore(dayjs(options.minDate), 'day')) {
      return true;
    }
    if (options.maxDate && date.isAfter(dayjs(options.maxDate), 'day')) {
      return true;
    }
    
    // 检查是否在禁用日期数组中
    if (options.disabledDates && options.disabledDates.length > 0) {
      for (const disabledDate of options.disabledDates) {
        if (date.isSame(dayjs(disabledDate), 'day')) {
          return true;
        }
      }
    }
    
    // 检查是否通过禁用函数判断
    if (options.isDateDisabled && options.isDateDisabled(date)) {
      return true;
    }
    
    return false;
  };
  
  // 判断日期是否被选中
  const isSelected = (date: Dayjs): boolean => {
    if (isRangeMode.value) {
      return startDate.value?.isSame(date, 'day') || endDate.value?.isSame(date, 'day');
    }
    return selectedDate.value?.isSame(date, 'day');
  };
  
  // 选择日期
  const selectDate = (date: Dayjs) => {
    if (isRangeMode.value) {
      // 范围选择模式：如果已选择开始日期，则设置为结束日期；否则设置为开始日期
      if (startDate.value && !endDate.value) {
        // 如果新选择的日期在开始日期之前，则交换
        if (date.isBefore(startDate.value, 'day')) {
          startDate.value = date;
          endDate.value = startDate.value;
        } else {
          endDate.value = date;
        }
      } else {
        startDate.value = date;
        endDate.value = null;
      }
    } else {
      selectedDate.value = date;
    }
  };
  
  // 设置当前年月
  const setCurrentMonth = (year: number, month: number) => {
    currentYear.value = year;
    currentMonth.value = month;
  };
  
  // 上一月
  const prevMonth = () => {
    if (currentMonth.value === 1) {
      currentYear.value--;
      currentMonth.value = 12;
    } else {
      currentMonth.value--;
    }
  };
  
  // 下一月
  const nextMonth = () => {
    if (currentMonth.value === 12) {
      currentYear.value++;
      currentMonth.value = 1;
    } else {
      currentMonth.value++;
    }
  };
  
  // 跳转到今天
  const goToToday = () => {
    const today = dayjs();
    currentYear.value = today.year();
    currentMonth.value = today.month() + 1;
  };
  
  return {
    currentMonthDates,
    currentYear,
    currentMonth,
    isToday,
    isDisabled: isDateDisabled,
    isSelected,
    selectDate,
    setCurrentMonth,
    prevMonth,
    nextMonth,
    goToToday
  };
}