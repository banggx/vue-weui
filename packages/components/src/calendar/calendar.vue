<template>
  <div class="weui-calendar" @click="visible = true">
    <div :class="['weui-date-value', { 'empty-value': !calendarValue }]">
      {{ calendarValue ? calendarValue : placeholder }}
    </div>
    <Icon
      v-if="allowClear && calendarValue"
      type="clear"
      class="clear-btn"
      @click.stop="clearValue"
    />
    <Icon type="arrow" />
  </div>
  <HalfScreenDialog v-model="visible">
    <template #hd>
      <div class="weui-calendar__title" @click="yearMonthPicker">
        {{ currentYear }}年{{ currentMonth + 1 }}月
      </div>
    </template>
    <div class="weui-calendar__header">
      <div class="weui-calendar__weekdays">
        <span
          v-for="day in ['日', '一', '二', '三', '四', '五', '六']"
          :key="day"
          >{{ day }}</span
        >
      </div>
    </div>
    <div
      class="weui-calendar__content"
      @touchstart="calendarTouchStart"
      @touchmove="calendarTouchMove"
      @touchend="calendarTouchEnd"
    >
      <Transition
        :name="slideDirection === 'up' ? 'slide-up' : 'slide-down'"
        mode="out-in"
      >
        <MonthViewer
          :key="`${currentYear}-${currentMonth}`"
          :year="currentYear"
          :month="currentMonth"
          :mode="mode"
          :min="min"
          :max="max"
          :start-date="startDate"
          :end-date="endDate"
          :selected-dates="selectedDates"
          :disabled="disabled"
          :disabled-date="disabledDate"
          @select="handleSelect"
        />
      </Transition>
    </div>
  </HalfScreenDialog>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { Icon } from '../icon';
import { HalfScreenDialog } from '../halfScreenDialog';
import MonthViewer from './monthViewer.vue';
import weui from 'weui.js';
import { registerPicker, unregisterPicker } from '../utils/pickerManager';
import type { CalendarMode, CalendarValue } from './types';
import './calendar.less';

defineOptions({
  name: 'weui-calendar'
});
const props = withDefaults(
  defineProps<{
    mode?: CalendarMode;
    modelValue?: CalendarValue;
    min?: string | Date;
    max?: string | Date;
    placeholder?: string;
    disabled?: boolean;
    defaultDate?: CalendarValue;
    allowClear?: boolean;
    disabledDate?: (date: Date) => boolean;
  }>(),
  {
    mode: 'range',
    placeholder: '请选择日期',
    min: '2000-1-1',
    max: '2030-1-1'
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', value: CalendarValue | undefined): void;
}>();
const visible = ref(false);
const currentYear = ref(dayjs().year());
const currentMonth = ref(dayjs().month());
const startDate = ref<string>('');
const endDate = ref<string>('');
const selectedDates = ref<string[]>([]);

const calendarValue = computed(() => {
  if (!props.modelValue) return;
  if (props.mode === 'single') {
    const value = Array.isArray(props.modelValue)
      ? props.modelValue[0]
      : props.modelValue;
    return value ? dayjs(value).format('YYYY-MM-DD') : '';
  } else if (props.mode === 'multiple') {
    const value = Array.isArray(props.modelValue)
      ? props.modelValue
      : [props.modelValue];
    return value.map((item) => dayjs(item).format('YYYY-MM-DD')).join(',');
  } else {
    const [start, end] = Array.isArray(props.modelValue)
      ? props.modelValue
      : [props.modelValue];
    if (start && end) {
      return (
        dayjs(start).format('YYYY-MM-DD') +
        '-' +
        dayjs(end).format('YYYY-MM-DD')
      );
    }
  }
  return '';
});

const clearValue = () => {
  emit('update:modelValue', undefined);
};
const handleSelect = (date: string) => {
  if (props.mode === 'single') {
    startDate.value = date;
    emit('update:modelValue', date);
  } else if (props.mode === 'multiple') {
    const dateIndex = selectedDates.value.indexOf(date);
    if (dateIndex === -1) {
      selectedDates.value.push(date);
    } else {
      selectedDates.value.splice(dateIndex, 1);
    }
    emit('update:modelValue', [...selectedDates.value]);
  } else {
    if (!startDate.value || (startDate.value && endDate.value)) {
      startDate.value = date;
      endDate.value = '';
    } else {
      if (dayjs(date).isBefore(startDate.value)) {
        endDate.value = startDate.value;
        startDate.value = date;
      } else {
        endDate.value = date;
      }
      emit('update:modelValue', [startDate.value, endDate.value]);
    }
  }
};
const touchStartY = ref(0);
const deltaY = ref(0);
const slideDirection = ref<'up' | 'down' | null>(null);
const calendarTouchStart = (ev: TouchEvent) => {
  touchStartY.value = ev.touches[0].clientY;
  slideDirection.value = null;
  deltaY.value = 0;
};
const calendarTouchMove = (ev: TouchEvent) => {
  ev.preventDefault();
  deltaY.value = ev.touches[0].clientY - touchStartY.value;
};
const calendarTouchEnd = () => {
  if (Math.abs(deltaY.value) > 50) {
    // 下滑，显示上一个月
    if (deltaY.value > 0) {
      slideDirection.value = 'down';
      if (currentMonth.value === 0) {
        currentYear.value--;
        currentMonth.value = 11;
      } else {
        currentMonth.value--;
      }
    } else {
      // 上滑，显示下一个月
      slideDirection.value = 'up';
      if (currentMonth.value === 11) {
        currentYear.value++;
        currentMonth.value = 0;
      } else {
        currentMonth.value++;
      }
    }
  }
};
const pickerYearAndMonth = computed(() => {
  const minDate = dayjs(props.min);
  const maxDate = dayjs(props.max);
  const minYear = minDate.year();
  const maxYear = maxDate.year();
  const results = [];
  for (let year = minYear; year <= maxYear; year++) {
    const currentYear: any = {
      label: year + '年',
      value: year,
      children: []
    };
    const minMonth = year === minYear ? minDate.month() : 0;
    const maxMonth = year === maxYear ? maxDate.month() : 11;
    for (let month = minMonth; month <= maxMonth; month++) {
      currentYear.children.push({
        label: month + 1 + '月',
        value: month
      });
    }
    results.push(currentYear);
  }
  return results;
});
const yearMonthPicker = () => {
  const pickerIns = weui.picker(pickerYearAndMonth.value, {
    className: 'weui-calendar-year-month-selector',
    defaultValue: [currentYear.value, currentMonth.value],
    onConfirm(result: any) {
      const [year, month] = result;
      currentYear.value = year.value;
      currentMonth.value = month.value;
    },
    onClose() {
      unregisterPicker(pickerIns);
    }
  });
  registerPicker(pickerIns);
};
// 监听初始默认值变化与选中
watch(
  () => props.defaultDate,
  () => {
    if (!props.defaultDate) return;
    let defaultStartDate: string | Date;
    if (props.mode === 'single') {
      startDate.value = dayjs(
        Array.isArray(props.defaultDate)
          ? props.defaultDate[0]
          : props.defaultDate
      ).format('YYYY-MM-DD');
      defaultStartDate = startDate.value;
      emit('update:modelValue', startDate.value);
    } else if (props.mode === 'multiple') {
      selectedDates.value = (
        Array.isArray(props.defaultDate)
          ? props.defaultDate
          : [props.defaultDate]
      ).map((item) => dayjs(item).format('YYYY-MM-DD'));
      defaultStartDate = selectedDates.value[0];
      emit('update:modelValue', selectedDates.value);
    } else {
      const [start, end] = Array.isArray(props.defaultDate)
        ? props.defaultDate
        : [props.defaultDate];
      startDate.value = dayjs(start).format('YYYY-MM-DD');
      end && (endDate.value = dayjs(end).format('YYYY-MM-DD'));
      defaultStartDate = startDate.value;
      start &&
        end &&
        emit('update:modelValue', [startDate.value, endDate.value]);
    }
    currentYear.value = dayjs(defaultStartDate).year();
    currentMonth.value = dayjs(defaultStartDate).month();
  },
  {
    immediate: true
  }
);
</script>
