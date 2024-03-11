<template>
  <div class="weui-flex__item" :style="{ flex }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-flex-item'
});
withDefaults(
  defineProps<{
    flex?: number;
  }>(),
  {
    flex: 1
  }
);
</script>
