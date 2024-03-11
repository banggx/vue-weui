<template>
  <div role="alert" class="weui-loadmore" :class="classNames">
    <span
      v-if="type === 'default'"
      aria-hidden="true"
      role="img"
      aria-label="正在加载"
      class="weui-primary-loading"
    >
      <i class="weui-primary-loading__dot"></i>
    </span>
    <span class="weui-loadmore__tips">
      <template v-if="type !== 'dot'">
        <slot v-if="$slots['default']"></slot>
        <template v-else>{{ text }}</template>
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'weui-loadmore'
});
const props = withDefaults(
  defineProps<{
    type?: 'default' | 'line' | 'dot';
    text?: string;
  }>(),
  {
    type: 'default',
    text: '正在加载'
  }
);
const classNames = computed(() => ({
  'weui-loadmore_line': props.type === 'line' || props.type === 'dot',
  'weui-loadmore_dot': props.type === 'dot'
}));
</script>
