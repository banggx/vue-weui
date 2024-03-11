<template>
  <ul class="weui-steps" :class="classNames">
    <slot></slot>
  </ul>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';
import { useVModel } from '@vueuse/core';
import { STEP_DIRECTION, ACTIVE_STEP, SET_ACTIVE_STEP } from './constant';

defineOptions({
  name: 'weui-steps'
});

const props = withDefaults(
  defineProps<{
    direction?: 'vertical' | 'horizontal';
    modelValue?: number;
  }>(),
  {
    direction: 'vertical'
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', value: number): void;
  (type: 'change', step: number): void;
}>();
const activeStep = useVModel(props, 'modelValue', emit);
const classNames = computed(() => ({
  'weui-steps_vertical': props.direction === 'vertical',
  'weui-steps_horizonal': props.direction === 'horizontal'
}));
const setActive = (step: number) => {
  activeStep.value = step;
  emit('change', step);
};

provide(STEP_DIRECTION, props.direction);
provide(ACTIVE_STEP, activeStep);
provide(SET_ACTIVE_STEP, setActive);
</script>
