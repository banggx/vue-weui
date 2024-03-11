<template>
  <button class="weui-btn" :class="classNames" @click="clickHandler">
    <i v-if="loading" class="weui-mask-loading"></i>
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'weui-button'
});

const props = withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'warn';
    size?: 'medium' | 'mini';
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    type: 'default',
    disabled: false,
    loading: false
  }
);
const emit = defineEmits<{
  (type: 'click', ev: MouseEvent): void;
}>();
const classNames = computed(() => [
  `weui-btn_${props.type}`,
  `weui-btn_${props.size}`,
  {
    'weui-btn_disabled': props.disabled
  },
  {
    'weui-btn_loading': props.loading
  }
]);

const clickHandler = (ev: MouseEvent) => {
  if (props.disabled) {
    return;
  }
  emit('click', ev);
};
</script>
