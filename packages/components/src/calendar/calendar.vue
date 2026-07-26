<template>
  <div class="weui-calendar">
      <!-- 固定的年月切换头部 -->
      <div class="weui-calendar-header">
        <button
          class="weui-calendar-nav weui-calendar-prev"
          @click="prevMonth"
          type="button"
        >
          <Icon type="arrow" :size="8" class="weui-calendar-arrow-left" />
        </button>
        <h3 class="weui-calendar-title" @click="toggleMonthPicker">
          {{ currentMonthTitle }}
        </h3>
        <button
          class="weui-calendar-nav weui-calendar-next"
          @click="nextMonth"
          type="button"
        >
          <Icon type="arrow" :size="8" class="weui-calendar-arrow-right" />
        </button>
      </div>

      <!-- 月份选择视图 -->
      <div v-if="viewMode === 'month'" class="weui-calendar-month-picker">
        <div
          v-for="(month, index) in months"
          :key="index"
          class="weui-calendar-month"
          :class="{
            'weui-calendar-month-selected': isMonthSelected(index)
          }"
          @click="selectMonth(index)"
        >
          {{ month }}
        </div>
      </div>

      <!-- 固定的星期栏 -->
      <div v-if="viewMode === 'day'" class="weui-calendar-weekdays">
        <div v-for="day in weekdays" :key="day" class="weui-calendar-weekday">
          {{ day }}
        </div>
      </div>

      <!-- 日期区域（展开，不滚动） -->
      <div
        v-if="viewMode === 'day'"
        class="weui-calendar-days"
        :class="{
          'month-transition': isTransitioning,
          'slide-in-left': slideDirection === 'left',
          'slide-in-right': slideDirection === 'right',
          'slide-out-left': slideDirection === 'left' && isTransitioning,
          'slide-out-right': slideDirection === 'right' && isTransitioning,
          'slide-in-active': !isTransitioning
        }"
        ref="daysRef"
      >
        <div
          v-for="date in calendarDays"
          :key="date.key"
          class="weui-calendar-day"
          :class="{
            'weui-calendar-day-empty': !date.date,
            'weui-calendar-day-today': date.isToday,
            'weui-calendar-day-selected': date.isSelected,
            'weui-calendar-day-disabled': date.isDisabled,
            'weui-calendar-day-range':
              date.isInRange && !date.isSelected && !date.isToday,
            'weui-calendar-day-range-start': date.isRangeStart,
            'weui-calendar-day-range-end': date.isRangeEnd,
            'weui-calendar-day-range-middle': date.isRangeMiddle
          }"
          @click="!date.isDisabled && date.date ? selectDate(date) : null"
        >
          {{ date.date ? date.date.getDate() : '' }}
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  watch,
  onBeforeUnmount
} from 'vue';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import './calendar.less';
import { useSwipe } from './composables/useSwipe';
import Icon from '../icon';

defineOptions({
  name: 'WeuiCalendar'
});

// Props
const props = withDefaults(
  defineProps<{
    modelValue?: Date | string | null;
    minDate?: Date | string | null;
    maxDate?: Date | string | null;
    disabledDates?: Date[] | ((date: Date) => boolean);
    showActions?: boolean;
    mode?: 'single' | 'range';
    title?: string;
  }>(),
  {
    title: '选择日期'
  }
);

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null | [Date, Date]): void;
  (e: 'change', value: Date | null | [Date, Date]): void;
  (e: 'select', value: Date | null | [Date, Date]): void;
  (e: 'confirm', value: Date | null | [Date, Date]): void;
  (e: 'clear'): void;
}>();

// Internal state
const daysRef = ref<HTMLElement | null>(null);
const currentDate = ref(dayjs());
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const isTransitioning = ref(false);
const slideDirection = ref<'left' | 'right' | null>(null);

// View mode: 'day' for date grid, 'month' for month picker
const viewMode = ref<'day' | 'month'>('day');

// Month names for month picker
const months = [
  '1月',
  '2月',
  '3月',
  '4月',
  '5月',
  '6月',
  '7月',
  '8月',
  '9月',
  '10月',
  '11月',
  '12月'
];

// Toggle month picker view
const toggleMonthPicker = () => {
  viewMode.value = viewMode.value === 'day' ? 'month' : 'day';
};

// Check if a month is selected
const isMonthSelected = (monthIndex: number) => {
  return currentDate.value.month() === monthIndex;
};

// Select a month from the month picker
const selectMonth = (monthIndex: number) => {
  currentDate.value = currentDate.value.month(monthIndex);
  viewMode.value = 'day';
};

// Use now for today's date
const now = useNow();

// Mode
const mode = computed(() => props.mode ?? 'single');

// Weekdays
const weekdays = computed(() => ['日', '一', '二', '三', '四', '五', '六']);

// Current month title
const currentMonthTitle = computed(() => {
  return `${currentDate.value.year()}年${currentDate.value.month() + 1}月`;
});

// Check if a date is disabled
const isDateDisabled = (date: Date): boolean => {
  const dayjsDate = dayjs(date);

  if (props.minDate) {
    const minDayjs = dayjs(props.minDate).startOf('day');
    if (dayjsDate.isBefore(minDayjs, 'day')) return true;
  }

  if (props.maxDate) {
    const maxDayjs = dayjs(props.maxDate).endOf('day');
    if (dayjsDate.isAfter(maxDayjs, 'day')) return true;
  }

  if (props.disabledDates) {
    if (Array.isArray(props.disabledDates)) {
      return props.disabledDates.some((disabledDate) =>
        dayjs(disabledDate).isSame(dayjsDate, 'day')
      );
    } else if (typeof props.disabledDates === 'function') {
      return props.disabledDates(date);
    }
  }

  return false;
};

// Generate calendar days
const calendarDays = computed(() => {
  const days = [];
  const year = currentDate.value.year();
  const month = currentDate.value.month();

  // First day of month
  const firstDay = dayjs(new Date(year, month, 1));
  const firstDayOfWeek = firstDay.day(); // 0 = Sunday

  // Last day of month
  const lastDay = dayjs(new Date(year, month + 1, 0));
  const lastDate = lastDay.date();

  // Previous month days (fill the grid)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      key: `prev-${i}`,
      date: null,
      isToday: false,
      isSelected: false,
      isDisabled: true,
      isInRange: false,
      isRangeStart: false,
      isRangeEnd: false,
      isRangeMiddle: false
    });
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const date = new Date(year, month, i);
    const dayjsDate = dayjs(date);
    const isToday = dayjsDate.isSame(now.value, 'day');
    const isDisabled = isDateDisabled(date);

    let isSelected = false;
    let isInRange = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    let isRangeMiddle = false;

    if (mode.value === 'single') {
      // Single selection mode
      if (props.modelValue) {
        const selectedDate =
          props.modelValue instanceof Date
            ? props.modelValue
            : new Date(props.modelValue);
        isSelected = dayjsDate.isSame(dayjs(selectedDate), 'day');
      }
    } else {
      // Range selection mode
      if (startDate.value) {
        const start = dayjs(startDate.value);
        isRangeStart = dayjsDate.isSame(start, 'day');

        if (endDate.value) {
          const end = dayjs(endDate.value);
          isRangeEnd = dayjsDate.isSame(end, 'day');
          isInRange =
            dayjsDate.isAfter(start, 'day') && dayjsDate.isBefore(end, 'day');
          isRangeMiddle = isInRange;
        }

        isSelected = isRangeStart || isRangeEnd;
      }
    }

    days.push({
      key: `day-${i}`,
      date,
      isToday,
      isSelected,
      isDisabled,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isRangeMiddle
    });
  }

  // Next month days (fill the grid to 42 cells)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push({
      key: `next-${i}`,
      date: null,
      isToday: false,
      isSelected: false,
      isDisabled: true,
      isInRange: false,
      isRangeStart: false,
      isRangeEnd: false,
      isRangeMiddle: false
    });
  }

  return days;
});

// Select date
const selectDate = (day: any) => {
  if (!day.date || day.isDisabled) return;

  if (mode.value === 'single') {
    // Single selection mode
    if (props.modelValue) {
      const selectedDate =
        props.modelValue instanceof Date
          ? props.modelValue
          : new Date(props.modelValue);

      // If clicking the same date, deselect
      if (dayjs(day.date).isSame(dayjs(selectedDate), 'day')) {
        emit('update:modelValue', null);
        emit('change', null);
        emit('select', null);
        return;
      }
    }

    emit('update:modelValue', day.date);
    emit('change', day.date);
    emit('select', day.date);
  } else {
    // Range selection mode
    if (!startDate.value || (startDate.value && endDate.value)) {
      // First click or both dates already selected, start new selection
      startDate.value = day.date;
      endDate.value = null;
      emit('select', day.date);
    } else {
      // Second click, set end date
      let start = startDate.value;
      let end = day.date;

      // Auto swap if end is before start
      if (dayjs(end).isBefore(dayjs(start))) {
        [start, end] = [end, start];
      }

      startDate.value = start;
      endDate.value = end;
      emit('select', [start, end]);
    }
  }
};

// Previous month
const prevMonth = () => {
  slideDirection.value = 'right';
  isTransitioning.value = true;

  setTimeout(() => {
    currentDate.value = currentDate.value.subtract(1, 'month');
    isTransitioning.value = false;
    slideDirection.value = null;
  }, 300);
};

// Next month
const nextMonth = () => {
  slideDirection.value = 'left';
  isTransitioning.value = true;

  setTimeout(() => {
    currentDate.value = currentDate.value.add(1, 'month');
    isTransitioning.value = false;
    slideDirection.value = null;
  }, 300);
};

// Watch modelValue changes (for single mode)
watch(
  () => props.modelValue,
  (newVal) => {
    if (mode.value === 'single' && newVal) {
      const date = newVal instanceof Date ? newVal : new Date(newVal);
      currentDate.value = dayjs(date);
    }
  },
  { immediate: true }
);

// Reset temporary range state (called by calendarPicker when closing)
const resetTempRange = () => {
  if (mode.value === 'range') {
    // 清理未完成的临时范围选择状态
    if (startDate.value && !endDate.value) {
      startDate.value = null;
      endDate.value = null;
    }
  }
};

// Lifecycle hooks
onMounted(() => {
  // Setup swipe gesture
  if (daysRef.value) {
    useSwipe(daysRef.value, {
      onSwipeEnd: (direction) => {
        if (direction === 'left') {
          nextMonth();
        } else if (direction === 'right') {
          prevMonth();
        }
      }
    });
  }
});

onBeforeUnmount(() => {
  // Cleanup if needed
});

// Expose methods for external control
defineExpose({
  nextMonth,
  prevMonth,
  resetTempRange
});
</script>

<style scoped>
/* 日历组件样式已移至 calendar.less */
</style>
