<template>
  <div class="weui-msg">
    <div v-if="type || $slots['icon-area']" class="weui-msg__icon-area">
      <slot v-if="$slots['icon-area']" name="icon-area"></slot>
      <Icon v-else :type="type!" class="weui-icon_msg" />
    </div>
    <div class="weui-msg__text-area">
      <h2 v-if="title || $slots['title']" class="weui-msg__title">
        <slot v-if="$slots['title']" name="title"></slot>
        <template v-else>{{ title }}</template>
      </h2>
      <p v-if="desc || $slots['desc']" class="weui-msg__desc">
        <slot v-if="$slots['desc']" name="desc"></slot>
        <template v-else>{{ desc }}</template>
      </p>
      <div v-if="$slots['custom-area']" class="weui-msg__custom-area">
        <slot name="custom-area"></slot>
      </div>
    </div>
    <div v-if="$slots['opr-area']" class="weui-msg__opr-area">
      <slot name="opr-area"></slot>
    </div>
    <div v-if="$slots['tips-area']" class="weui-msg__tips-area">
      <slot name="tips-area"></slot>
    </div>
    <div v-if="$slots['extra-area']" class="weui-msg__extra-area">
      <slot name="extra-area"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Icon from '../icon';

defineOptions({
  name: 'weui-msg'
});
withDefaults(
  defineProps<{
    type?: 'success' | 'info' | 'waiting' | 'warn';
    title?: string;
    desc?: string;
  }>(),
  {
    title: '',
    desc: ''
  }
);
</script>
