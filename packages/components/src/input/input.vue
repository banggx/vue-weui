<template>
  <div class="weui-input-wrapper weui-flex" :class="classnames">
    <input
      id="js_input1"
      class="weui-input"
      :value="value"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="setInputValue"
    />
    <button
      v-if="allowClear && value"
      id="js_input_clear"
      class="weui-btn_reset weui-btn_icon weui-btn_input-clear"
      wah-hotarea="click"
      @click="clearValue"
    >
      <i class="weui-icon-clear"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';
import './input.less';

defineOptions({
  name: 'weui-input'
});
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    type?: 'text' | 'password' | 'url' | 'tel';
    placeholder?: string;
    allowClear?: boolean;
    disabled?: boolean;
  }>(),
  {
    type: 'text',
    allowClear: false,
    disabled: false
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
const clearValue = () => {
  value.value = '';
  emit('change', '');
};
</script>
