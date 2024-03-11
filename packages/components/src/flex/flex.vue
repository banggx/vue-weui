<template>
  <div class="weui-flex" :style="{ gap: gapstyle }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
defineOptions({
  name: 'weui-flex'
});
const props = withDefaults(
  defineProps<{
    gap?: number | [number, number];
  }>(),
  {
    gap: 0
  }
);

const gapstyle = computed(() => {
  if (typeof props.gap === 'number') {
    return props.gap + 'px';
  }
  return `${props.gap[0]}px ${props.gap[1]}px`;
});
</script>
