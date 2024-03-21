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

<script lang="ts" setup generic="R extends boolean, T = any">
import { computed } from 'vue';
import { Icon } from '../icon';
import { useVModel } from '@vueuse/core';
import weui from 'weui.js';
import type { PickerItem } from './types';
import './picker.less';

type Val = R extends true ? PickerItem<T>[] : PickerItem<T>;
defineOptions({
  name: 'weui-picker'
});
const props = withDefaults(
  defineProps<{
    modelValue?: R extends true ? T[] : T;
    options?: PickerItem<T>[] | PickerItem<T>[][];
    placeholder?: string;
    disabled?: boolean;
    isMulti?: R;
    delimiter?: string;
    confirmText?: string;
    title?: string;
    desc?: string;
  }>(),
  {
    options: () => [],
    disabled: false,
    delimiter: '/',
    confirmText: '确定'
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: T | T[]): void;
  (type: 'selectChange', val: Val): void;
  (type: 'change', val: Val): void;
}>();
const value = useVModel(props, 'modelValue', emit);
const valueLabel = computed(() => {
  if (!props.isMulti) {
    const firstOptions = Array.isArray(props.options[0])
      ? props.options[0]
      : props.options;
    return (firstOptions as PickerItem<T>[]).find(
      (item) => item.value === value.value
    )?.label;
  }
  let currentIndex = 0;
  let nextOptions = Array.isArray(props.options[currentIndex])
    ? props.options[currentIndex]
    : props.options;
  const result: string[] = [];
  while (currentIndex <= (value.value as Array<T>)?.length && nextOptions) {
    const currentOption = (nextOptions as PickerItem<T>[]).find(
      (item) => item.value === (value.value as T[])[currentIndex]
    );
    if (!currentOption) {
      break;
    }
    result.push(currentOption.label);
    currentIndex++;
    nextOptions = Array.isArray(props.options[currentIndex])
      ? (props.options[currentIndex] as PickerItem<T>[])
      : (currentOption.children as PickerItem<T>[]);
  }
  return result.join(props.delimiter);
});
const classnames = computed(() => ({
  'weui-picker_diabled': props.disabled,
  'weui-picker_placeholder': !value.value
}));

const pickerSelector = () => {
  if (props.disabled) return;
  const pickerOptions = Array.isArray(props.options[0])
    ? props.options
    : [props.options];
  weui.picker(...pickerOptions, {
    className: 'weui-picker-selector',
    container: 'body',
    defaultValue: [value.value],
    confirmText: props.confirmText,
    title: props.title,
    desc: props.desc,
    onChange(result: PickerItem<T>[]) {
      const emitResult = props.isMulti ? result : result[0];
      emit('selectChange', emitResult as Val);
    },
    onConfirm(result: PickerItem<T>[]) {
      const emitResult = props.isMulti ? result : result[0];
      value.value = (
        props.isMulti
          ? (emitResult as PickerItem<T>[]).map((item) => item.value)
          : (emitResult as PickerItem<T>).value
      ) as R extends true ? T[] : T;
      emit('change', emitResult as Val);
    }
  });
};
</script>
