<template>
  <div class="weui-switch-cp" :class="classnames" @click="toggleSwitch">
    <input
      aria-labelledby="cp_txt"
      class="weui-switch-cp__input"
      type="checkbox"
      :checked="value"
      :disabled="disabled"
    />
    <div class="weui-switch-cp__box"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';

defineOptions({
  name: 'weui-switch'
});
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    disabled?: boolean;
  }>(),
  {
    disabled: false
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: boolean): void;
  (type: 'change', val: boolean): void;
}>();
const value = useVModel(props, 'modelValue', emit);
const classnames = computed(() => ({
  'weui-cell_disabled': props.disabled
}));

const toggleSwitch = () => {
  if (props.disabled) return;
  value.value = !value.value;
  emit('change', !value.value);
};
</script>
