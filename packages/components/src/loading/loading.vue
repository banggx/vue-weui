<template>
  <i
    role="img"
    aria-label="正在加载"
    class="weui-mask-loading"
    :class="classNames"
  ></i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import './loading.less';

defineOptions({
  name: 'weui-loading'
});
const props = withDefaults(
  defineProps<{
    type: 'default' | 'primary';
  }>(),
  {
    type: 'default'
  }
);
const classNames = computed(() => ({
  'weui-loading-primary': props.type === 'primary'
}));
</script>
