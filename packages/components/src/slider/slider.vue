<template>
  <div class="weui-slider-box">
    <div id="slider" class="weui-slider">
      <div id="sliderInner" class="weui-slider__inner">
        <div
          id="sliderTrack"
          :style="{ width: value + '%' }"
          class="weui-slider__track"
        ></div>
        <div
          role="slider"
          aria-label="可调滑块"
          id="sliderHandler"
          :style="{ left: value + '%' }"
          class="weui-slider__handler weui-wa-hotarea"
          wah-hotarea="touchstart"
        ></div>
      </div>
    </div>
    <div
      v-if="showNum"
      id="sliderValue"
      role="alert"
      class="weui-slider-box__value"
    >
      {{ value }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useVModel } from '@vueuse/core';
import weui from 'weui.js';

defineOptions({
  name: 'weui-slider'
});

const props = withDefaults(
  defineProps<{
    modelValue: number;
    showNum?: boolean;
    step?: number;
  }>(),
  {
    modelValue: 0,
    showNum: false,
    step: 1
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: number): void;
  (type: 'change', val: number): void;
}>();
const value = useVModel(props, 'modelValue', emit);

onMounted(() => {
  weui.slider('#slider', {
    step: props.step,
    defaultValue: value.value,
    onChange(percent: number) {
      value.value = percent;
      emit('change', percent);
    }
  });
});
</script>
