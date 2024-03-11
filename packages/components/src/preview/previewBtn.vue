<template>
  <a
    role="button"
    class="weui-form-preview__btn"
    href="javascript:"
    :class="classNames"
    @click.prevent="clickHandler"
  >
    <slot></slot>
  </a>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

defineOptions({
  name: 'weui-preview-btn'
});

const props = withDefaults(
  defineProps<{
    type?: 'primary' | 'default';
  }>(),
  {
    type: 'default'
  }
);
const emit = defineEmits<{
  (type: 'click', ev: MouseEvent): void;
}>();
const classNames = computed(() => ({
  'weui-form-preview__btn_primary': props.type === 'primary',
  'weui-form-preview__btn_default': props.type === 'default'
}));

const clickHandler = (ev: MouseEvent) => {
  emit('click', ev);
};
</script>
