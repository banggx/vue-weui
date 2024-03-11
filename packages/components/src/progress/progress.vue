<template>
  <div class="weui-progress">
    <div class="weui-progress__bar">
      <div
        class="weui-progress__inner-bar js_progress"
        :style="{ width: count + '%' }"
      ></div>
    </div>
    <a
      v-if="showClose"
      href="javascript:"
      role="button"
      class="weui-wa-hotarea weui-progress__opr"
      @click.prevent="(ev) => emit('close', ev)"
    >
      <i role="img" aria-label="取消" class="weui-icon-cancel"></i>
    </a>
    <div v-if="$slots['extra']" class="weui-progress-extra-wrapper">
      <slot name="extra"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import './progress.less';

defineOptions({
  name: 'weui-progress'
});

withDefaults(
  defineProps<{
    count?: number;
    showClose?: boolean;
  }>(),
  {
    count: 0,
    showClose: false
  }
);
const emit = defineEmits<{
  (type: 'close', ev: MouseEvent): void;
}>();
</script>
