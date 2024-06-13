<template>
  <div class="weui-textarea-wrapper" :class="classnames">
    <textarea
      class="weui-textarea"
      :value="value"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      @input="setInputValue"
    />
    <div
      v-if="maxlength && showNum"
      role="option"
      aria-live="polite"
      class="weui-textarea-counter"
    >
      <span>{{ value?.length }}</span
      >/{{ maxlength }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';
import './textarea.less';

defineOptions({
  name: 'weui-textarea'
});
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    disabled?: boolean;
    maxlength?: number;
    showNum?: boolean;
  }>(),
  {
    disabled: false,
    showNum: false
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: string): void;
  (type: 'change', val: string): void;
}>();
const value = useVModel(props, 'modelValue', emit);
const classnames = computed(() => ({
  'weui-cell_disabled': props.disabled
}));

const setInputValue = (ev: Event) => {
  const targetValue = (ev.target as HTMLInputElement).value;
  value.value = targetValue;
  emit('change', targetValue);
};
</script>
