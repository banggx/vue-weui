<template>
  <div id="mask1" class="js_close" :class="classNames" wah-hotarea="click">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'weui-mask'
});

const props = withDefaults(
  defineProps<{
    type?: 'transparent' | 'default';
  }>(),
  {
    type: 'default'
  }
);
const classNames = computed(() => ({
  'weui-mask_transparent': props.type === 'transparent',
  'weui-mask': props.type === 'default'
}));
</script>
