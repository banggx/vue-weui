<template>
  <div v-show="visible" role="alert" id="toast">
    <Mask type="transparent" />
    <div class="weui-toast" :class="classNames">
      <i
        v-if="type !== 'text'"
        class="weui-icon_toast"
        :class="iconClassNames"
      ></i>
      <p class="weui-toast__content">{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';
import Mask from '../mask';

defineOptions({
  name: 'weui-toast'
});
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    type?: 'success' | 'warn' | 'text' | 'loading';
    text?: string;
    long?: boolean;
  }>(),
  {
    modelValue: false,
    type: 'success',
    text: '',
    long: false
  }
);
const emit = defineEmits(['update:modelValue']);
const visible = useVModel(props, 'modelValue', emit);

const classNames = computed(() => ({
  'weui-toast_text-more': props.long,
  'weui-toast_text': props.type === 'text'
}));
const iconClassNames = computed(() => ({
  'weui-icon-success-no-circle': props.type === 'success',
  'weui-icon-warn': props.type === 'warn',
  'weui-primary-loading': props.type === 'loading'
}));
</script>
