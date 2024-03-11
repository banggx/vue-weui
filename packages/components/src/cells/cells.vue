<template>
  <div class="weui-cells-wrapper">
    <div v-if="title" class="weui-cells__title">{{ title }}</div>
    <div class="weui-cells">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-cells'
});
withDefaults(
  defineProps<{
    title: string;
  }>(),
  {
    title: ''
  }
);
</script>
