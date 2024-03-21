<template>
  <div
    class="weui-time-picker-wrapper weui-flex"
    :class="classnames"
    @click="pickerSelector"
  >
    <div class="weui-select">{{ valueLabel }}</div>
    <Icon type="arrow" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Icon } from '../icon';
import { useVModel } from '@vueuse/core';
import weui from 'weui.js';
import { parseCron } from './cron';
import { TimeItem } from './types';
import './timePicker.less';

defineOptions({
  name: 'weui-time-picker'
});
const props = withDefaults(
  defineProps<{
    modelValue?: number[];
    placeholder?: string;
    disabled?: boolean;
    formatter?: (val: number[]) => string;
    cron?: string;
    hourFormatter?: (val: number) => { label: string; disabled?: boolean };
    minuteFormatter?: (val: number) => { label: string; disabled?: boolean };
    secondFormatter?: (val: number) => { label: string; disabled?: boolean };
  }>(),
  {
    disabled: false,
    cron: '* * *',
    formatter: (val: number[]) => val.join(':'),
    hourFormatter: (val: number) => ({ label: `${val}时` }),
    minuteFormatter: (val: number) => ({ label: `${val}分` }),
    secondFormatter: (val: number) => ({ label: `${val}秒` })
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: number[]): void;
  (type: 'selectChange', val: TimeItem[]): void;
  (type: 'change', val: TimeItem[]): void;
}>();
const value = useVModel(props, 'modelValue', emit);
const valueLabel = computed(() =>
  value.value ? props.formatter(value.value) : props.placeholder
);
const classnames = computed(() => ({
  'weui-picker_diabled': props.disabled,
  'weui-picker_placeholder': !value.value
}));
const cronFields = computed(() => parseCron(props.cron));
const hourPicker = computed(() =>
  cronFields.value[0].map((item) => ({
    value: item,
    ...props.hourFormatter(item)
  }))
);
const minutePicker = computed(() =>
  (cronFields.value[1] || []).map((item) => ({
    value: item,
    ...props.minuteFormatter(item)
  }))
);
const secondPicker = computed(() =>
  (cronFields.value[2] || []).map((item) => ({
    value: item,
    ...props.secondFormatter(item)
  }))
);

const pickerSelector = () => {
  if (props.disabled) return;
  const options = [
    hourPicker.value,
    minutePicker.value,
    secondPicker.value
  ].filter((item) => item.length);
  weui.picker(...options, {
    className: 'weui-time-picker-selector',
    container: 'body',
    onChange(result: TimeItem[]) {
      emit('selectChange', result);
    },
    onConfirm(result: TimeItem[]) {
      value.value = result.map((item) => item.value);
      emit('change', result);
    }
  });
};
</script>
