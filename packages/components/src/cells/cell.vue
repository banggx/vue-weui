<template>
  <div role="option" class="weui-cell" :class="classNames">
    <div class="weui-cell__hd">
      <slot name="hd"></slot>
    </div>
    <div class="weui-cell__bd">
      <slot></slot>
    </div>
    <div class="weui-cell__ft">
      <slot name="ft"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'weui-cell'
});
const props = withDefaults(
  defineProps<{
    arrow?: boolean;
    link?: boolean;
  }>(),
  {
    arrow: false,
    link: false
  }
);
const classNames = computed(() => ({
  'weui-cell_access': props.arrow,
  'weui-cell_link': props.link
}));
</script>
