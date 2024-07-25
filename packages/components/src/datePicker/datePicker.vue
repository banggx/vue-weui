<template>
  <div
    class="weui-date-picker-wrapper weui-flex"
    :class="classnames"
    @click="pickerSelector"
  >
    <div class="weui-date-value">{{ valueLabel }}</div>
    <Icon type="arrow" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Icon } from '../icon';
import { useVModel } from '@vueuse/core';
import weui from 'weui.js';
import dayjs, { Dayjs } from 'dayjs';
import { registerPicker, unregisterPicker } from '../utils/pickerManager';
import type { DateItem } from './types';
import './datePicker.less';

defineOptions({
  name: 'weui-date-picker'
});
const props = withDefaults(
  defineProps<{
    modelValue?: Date | Dayjs;
    start?: Date | number | string | Dayjs;
    end?: Date | number | string | Dayjs;
    placeholder?: string;
    disabled?: boolean;
    formatter?: string;
    cron?: string;
    container?: string;
  }>(),
  {
    start: () => dayjs('2000-1-1'),
    end: () => dayjs('2030-1-1'),
    disabled: false,
    formatter: 'YYYY-MM-DD',
    cron: '* * *',
    container: 'body'
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: Date | Dayjs): void;
  (type: 'selectChange', val: Dayjs): void;
  (type: 'change', val: Dayjs): void;
}>();
const value = useVModel(props, 'modelValue', emit);
const valueLabel = computed(() =>
  value.value ? dayjs(value.value).format(props.formatter) : props.placeholder
);
const classnames = computed(() => ({
  'weui-picker_diabled': props.disabled,
  'weui-picker_placeholder': !value.value
}));

const pickerSelector = () => {
  if (props.disabled) return;
  const defaultDate = dayjs(value.value);
  const defaultYear = defaultDate.year();
  const defaultMoth = defaultDate.month() + 1;
  const defaultday = defaultDate.date();

  const pickerIns = weui.datePicker({
    className: 'weui-date-picker-selector',
    container: props.container,
    start: dayjs(props.start).toDate(),
    end: dayjs(props.end).toDate(),
    defaultValue: [defaultYear, defaultMoth, defaultday],
    cron: props.cron,
    onChange(result: [DateItem, DateItem, DateItem]) {
      const [year, month, day] = result;
      const date = dayjs([year.value, month.value, day.value].join('-'));
      emit('selectChange', date);
    },
    onConfirm(result: [DateItem, DateItem, DateItem]) {
      const [year, month, day] = result;
      const date = dayjs([year.value, month.value, day.value].join('-'));
      const valueDate = value.value instanceof Date ? date.toDate() : date;
      value.value = valueDate;
      emit('change', date);
    },
    onClose() {
      unregisterPicker(pickerIns);
    }
  });

  registerPicker(pickerIns);
};
</script>
