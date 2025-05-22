<template>
  <i class="weui-icon" :class="classNames" :style="styles"></i>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'weui-icon'
});

const props = defineProps<{
  type:
    | 'success'
    | 'info'
    | 'waiting'
    | 'warn'
    | 'success-no-circle'
    | 'close'
    | 'close-thin'
    | 'slide-down'
    | 'arrow'
    | 'outlined-warn'
    | 'clear';
  size?: number | string;
}>();
const classNames = computed(() => [`weui-icon-${props.type}`]);
const styles = computed(() => {
  const styles = {};
  if (props.size) {
    Object.assign(styles, {
      fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size
    });
  }
  return styles;
});
</script>
