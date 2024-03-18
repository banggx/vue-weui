<template>
  <div
    class="weui-picker-wrapper weui-flex"
    :class="classnames"
    @click="pickerSelector"
  >
    <div class="weui-select">{{ valueLabel || placeholder }}</div>
    <Icon type="arrow" />
  </div>
</template>

<script lang="ts" setup generic="T = any">
import { computed } from 'vue';
import { Icon } from '../icon';
import { useVModel } from '@vueuse/core';
import weui from 'weui.js';
import type { PickerItem } from './types';
import './picker.less';

defineOptions({
  name: 'weui-picker'
});
const props = withDefaults(
  defineProps<{
    modelValue?: T;
    options?: PickerItem<T>[];
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    options: () => [],
    disabled: false
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: T): void;
  (type: 'selectChange', val: PickerItem<T>): void;
  (type: 'change', val: PickerItem<T>): void;
}>();
const value = useVModel(props, 'modelValue', emit);
const valueLabel = computed(
  () => props.options.find((item) => item.value === value.value)?.label
);
const classnames = computed(() => ({
  'weui-picker_diabled': props.disabled
}));

const pickerSelector = () => {
  if (props.disabled) return;
  weui.picker(props.options, {
    className: 'weui-picker-selector',
    container: 'body',
    defaultValue: [value.value],
    onChange(result: PickerItem<T>[]) {
      emit('selectChange', result[0]);
    },
    onConfirm(result: PickerItem<T>[]) {
      value.value = result[0].value;
      emit('change', result[0]);
    }
  });
};
</script>
