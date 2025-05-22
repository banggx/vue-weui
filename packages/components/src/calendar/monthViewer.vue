<template>
  <div class="weui-calendar__month-viewer">
    <div class="weui-calendar__days">
      <div
        v-for="({ date, isCurrentMonth }, index) in daysInMonth"
        :key="index"
        :class="{
          'day-wrapper': true,
          'current-month': isCurrentMonth,
          selected: isSelected(date),
          'in-range': isInRange(date),
          disabled: isDisabled(date)
        }"
        @click.stop="selectDate(date)"
      >
        <div class="day-number">
          {{ date ? dayjs(date).date() : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import type { CalendarMode } from './types';

dayjs.extend(isBetween);
const emit = defineEmits<{
  (type: 'select', date: string): void;
}>();
const props = defineProps<{
  year: number;
  month: number;
  mode: CalendarMode;
  min: string | Date;
  max: string | Date;
  startDate?: string;
  endDate?: string;
  selectedDates?: string[];
  disabled?: boolean;
  disabledDate?: (date: Date) => boolean;
}>();
const daysInMonth = computed(() => {
  const firstDay = dayjs().year(props.year).month(props.month).startOf('month');
  const daysInMonth = firstDay.daysInMonth();
  const firstDayOfWeek = firstDay.day();

  const days = [];
  // Add days from previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({
      date: '',
      isCurrentMonth: false
    });
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      date: dayjs()
        .year(props.year)
        .month(props.month)
        .date(i)
        .format('YYYY-MM-DD'),
      isCurrentMonth: true
    });
  }

  // Add days from next month
  const remainingDays = 42 - days.length;
  for (let i = 0; i < remainingDays; i++) {
    days.push({
      date: '',
      isCurrentMonth: false
    });
  }
  return days;
});

const isInRange = (date: string) => {
  if (date && props.mode === 'range' && props.startDate && props.endDate) {
    return dayjs(date).isBetween(props.startDate, props.endDate, 'day', '()');
  }
  return false;
};
const isSelected = (date: string) => {
  if (!date) return false;
  if (props.mode === 'single') {
    return date === props.startDate;
  } else if (props.mode === 'multiple') {
    return props.selectedDates?.includes(date) || false;
  } else {
    return date === props.startDate || date === props.endDate;
  }
};
const isDisabled = (date: string) => {
  if (!date) return false;
  if (props.disabled) return true;
  if (dayjs(date).isBefore(props.min) || dayjs(date).isAfter(props.max)) {
    return true;
  }
  if (props.disabledDate) {
    return props.disabledDate(dayjs(date).toDate());
  }
  return false;
};
const selectDate = (date: string) => {
  if (!date || isDisabled(date)) return;
  emit('select', date);
};
</script>
