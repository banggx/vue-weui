<template>
  <div class="weui-footer">
    <p v-if="$slots['links']" class="weui-footer__links">
      <slot name="links"></slot>
    </p>
    <p class="weui-footer__text">
      <slot v-if="$slots['default']"></slot>
      <template v-else>{{ text }}</template>
    </p>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-footer'
});
withDefaults(
  defineProps<{
    text?: string;
  }>(),
  {
    text: ''
  }
);
</script>
