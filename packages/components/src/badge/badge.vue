<template>
  <div
    class="weui-badge-wrapper"
    :class="{ 'weui-badge-content': $slots['content'] }"
  >
    <slot name="content"></slot>
    <span
      id="b1_n1"
      class="weui-badge"
      :class="{ 'weui-badge_dot': dot }"
      aria-label=""
    >
      <template v-if="!dot">
        <slot v-if="$slots['default']"></slot>
        <template v-else>{{ badgeValue }}</template>
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import './badge.less';

defineOptions({
  name: 'weui-badge'
});
const props = withDefaults(
  defineProps<{
    dot?: boolean;
    value?: string | number;
    max?: number;
  }>(),
  {
    dot: false,
    value: undefined,
    max: undefined
  }
);

const badgeValue = computed(() => {
  if (typeof props.value === 'string') {
    return props.value;
  }
  if (props.max) {
    return props.value > props.max ? `${props.max}+` : props.value;
  }
  return props.value;
});
</script>
