<template>
  <li class="weui-steps__item" :class="classNames" @click="emitSetActive">
    <div class="weui-steps__item__inner" :style="innerStepStyle">
      <strong class="weui-steps__item__title">
        <slot v-if="$slots['title']" name="title"></slot>
        <template v-else>{{ title }}</template>
      </strong>
      <span class="weui-steps__item__desc">
        <slot v-if="$slots['desc']" name="desc"></slot>
        <template v-else>{{ desc }}</template>
      </span>
      <i
        v-if="icon"
        :class="`weui-icon weui-icon-${icon} weui-steps__icon`"
      ></i>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { inject, computed } from 'vue';
import { STEP_DIRECTION, ACTIVE_STEP, SET_ACTIVE_STEP } from './constant';
import type { Ref } from 'vue';
import type { Maybe } from 'vue-weui-utils';

defineOptions({
  name: 'weui-step-item'
});

const props = withDefaults(
  defineProps<{
    step: number;
    title?: string;
    desc?: string;
    icon?: 'waiting' | 'success';
  }>(),
  {
    step: 0,
    title: '',
    desc: ''
  }
);
const direction = inject(STEP_DIRECTION) as Maybe<'vertical' | 'horizontal'>;
const activeStep = inject(ACTIVE_STEP) as Maybe<Ref<number>>;
const setActive = inject(SET_ACTIVE_STEP) as Maybe<(step: number) => void>;

const classNames = computed(() => ({
  'weui-steps__item_success': (activeStep?.value as number) > props.step,
  'weui-steps__item_icon': props.icon,
  'weui-steps__item_icon-prev': props.icon && activeStep?.value === props.step
}));
const innerStepStyle = computed(() => ({
  display: direction === 'horizontal' ? 'none' : 'block'
}));

const emitSetActive = () => {
  setActive && setActive(props.step);
};
</script>
