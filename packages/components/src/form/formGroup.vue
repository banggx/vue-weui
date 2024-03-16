<template>
  <div class="weui-cells__group weui-cells__group_form">
    <div v-if="title || $slots['title']" class="weui-cells__title">
      <slot v-if="$slots['title']" name="title"></slot>
      <template v-else>{{ title }}</template>
    </div>
    <div class="weui-cells">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-form-group'
});
withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {}
);
</script>
