<template>
  <a :href="link" :target="target" class="weui-footer__link weui-wa-hotarea">
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-footer-link'
});
withDefaults(
  defineProps<{
    link?: string;
    target?: '_blank';
  }>(),
  {
    link: ''
  }
);
</script>
