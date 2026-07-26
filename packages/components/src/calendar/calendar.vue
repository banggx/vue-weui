<template>
  <HalfScreenDialog
    v-model="showState"
    :title="title"
    :show-close="true"
    icon-type="close"
    @close="handleClose"
  >
    <!-- header 右侧确认按钮 -->
    <template #extra>
      <button
        class="weui-calendar-header-confirm"
        @click="confirmSelection"
        type="button"
      >
        确认
      </button>
    </template>

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
        <h3 class="weui-calendar-title">{{ currentMonthTitle }}</h3>
        <button
          class="weui-calendar-nav weui-calendar-next"
          @click="nextMonth"
          type="button"
        >
          <Icon type="arrow" :size="8" class="weui-calendar-arrow-right" />
        </button>
      </div>
      
      <!-- 固定的星期栏 -->
      <div class="weui-calendar-weekdays">
        <div
          v-for="day in weekdays"
          :key="day"
          class="weui-calendar-weekday"
        >
          {{ day }}
        </div>
      </div>
      
      <!-- 日期区域（展开，不滚动） -->
      <div
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
  </HalfScreenDialog>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  nextTick,
  watch,
  onBeforeUnmount
} from 'vue';
import { useNow } from '@vueuse/core';
import dayjs from 'dayjs';
import './calendar.less';
import { useSwipe } from './composables/useSwipe';
import { useLockScroll } from './composables/useLockScroll';
import HalfScreenDialog from '../halfScreenDialog';
import Icon from '../icon';

defineOptions({
  name: 'WeuiCalendar'
});

// Props
const props = withDefaults(defineProps<{
  modelValue?: Date | string | null;
  minDate?: Date | string | null;
  maxDate?: Date | string | null;
  disabledDates?: Date[] | ((date: Date) => boolean);
  showActions?: boolean;
  mode?: 'single' | 'range';
  show?: boolean;
  title?: string;
}>(), {
  title: '选择日期'
});

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null | [Date, Date]): void;
  (e: 'change', value: Date | null | [Date, Date]): void;
  (e: 'select', value: Date | null | [Date, Date]): void;
  (e: 'confirm', value: Date | null | [Date, Date]): void;
  (e: 'clear'): void;
  (e: 'update:show', value: boolean): void;
  (e: 'hide'): void;
  (e: 'show'): void;
}>();

// Internal state
const showState = computed({
  get: () => props.show ?? false,
  set: (val: boolean) => emit('update:show', val)
});

const calendarRef = ref<HTMLElement | null>(null);
const daysRef = ref<HTMLElement | null>(null);
const currentDate = ref(dayjs());
const startDate = ref<Date | null>(null);
const endDate = ref<Date | null>(null);
const isTransitioning = ref(false);
const slideDirection = ref<'left' | 'right' | null>(null);

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
      return props.disabledDates.some(disabledDate => 
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
  const prevMonthLastDay = dayjs(new Date(year, month, 0));
  const prevMonthLastDate = prevMonthLastDay.date();
  
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDate - i);
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
        const selectedDate = props.modelValue instanceof Date 
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
          isInRange = dayjsDate.isAfter(start, 'day') && dayjsDate.isBefore(end, 'day');
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

// Has selection
const hasSelection = computed(() => {
  if (mode.value === 'single') {
    return !!props.modelValue;
  } else {
    return !!startDate.value && !!endDate.value;
  }
});

// Select date
const selectDate = (day: any) => {
  if (!day.date || day.isDisabled) return;
  
  if (mode.value === 'single') {
    // Single selection mode
    if (props.modelValue) {
      const selectedDate = props.modelValue instanceof Date 
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

// Confirm selection
const confirmSelection = () => {
  if (mode.value === 'single') {
    if (props.modelValue) {
      const value = props.modelValue instanceof Date 
        ? props.modelValue 
        : new Date(props.modelValue);
      emit('confirm', value);
    }
  } else {
    if (startDate.value && endDate.value) {
      emit('confirm', [startDate.value, endDate.value]);
    }
  }
  hide();
};

// Clear selection
const clearSelection = () => {
  if (mode.value === 'single') {
    emit('update:modelValue', null);
    emit('change', null);
  } else {
    startDate.value = null;
    endDate.value = null;
  }
  emit('clear');
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

// Popup lifecycle methods
const open = () => {
  if (props.show) return;

  emit('update:show', true);
  emit('show');
};

const hide = () => {
  if (!props.show) return;

  emit('update:show', false);
  emit('hide');
};

const handleClose = () => {
  hide();
};

// ESC key handler
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    hide();
  }
};

// Scroll locking
const { lockScroll, unlockScroll } = useLockScroll();

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleEscKey);
  
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
  document.removeEventListener('keydown', handleEscKey);
  // 确保组件卸载时解锁滚动
  unlockScroll();
});

// Watch show prop for scroll locking/unlocking
watch(
  () => props.show,
  (newVal, oldVal) => {
    if (newVal && !oldVal) {
      // Show -> lock scroll
      lockScroll();
    } else if (!newVal && oldVal) {
      // Hide -> unlock scroll
      unlockScroll();

      // 弹层关闭时清理临时范围选择状态，避免下次打开时状态残留
      // 这是 PRD 已批准技术方案 [high] 的要求
      if (mode.value === 'range') {
        // 只有在范围选择未完成时才清理临时状态
        // 如果已有完整的 startDate 和 endDate，说明用户已确认选择，不清理
        if (startDate.value && !endDate.value) {
          // 仅选择了起始日但未选择结束日，清理临时状态
          startDate.value = null;
          endDate.value = null;
        }
      }
    }
  }
);

// Expose methods for external control
defineExpose({
  open,
  hide
});
</script>

<style scoped>
/* 日历组件样式已移至 calendar.less */
</style>
