<template>
  <Transition name="weui-slide-down" :duration="{ enter: 150, leave: 150 }">
    <div
      v-if="visible"
      role="alert"
      class="weui-information-bar"
      id="js_informationBar"
      :class="classNames"
    >
      <div v-if="showIcon" class="weui-information-bar__hd">
        <slot v-if="$slots['icon']" name="icon"></slot>
        <Icon type="outlined-warn" />
      </div>
      <div class="weui-information-bar__bd">
        <slot v-if="$slots['default']"></slot>
        <template v-else>{{ text }}</template>
      </div>
      <div class="weui-information-bar__ft">
        <slot v-if="$slots['extra']" name="extra"></slot>
        <button v-if="showClose" class="weui-btn_icon" @click="closeHandler">
          <Icon type="close-thin"></Icon>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Icon from '../icon';
import { useVModel } from '@vueuse/core';

defineOptions({
  name: 'weui-alert'
});
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    type?: 'warn-primary' | 'warn' | 'default' | 'tips-primary' | 'tips';
    text?: string;
    showClose?: boolean;
    showIcon?: boolean;
  }>(),
  {
    modelValue: false,
    type: 'default',
    text: 'string',
    showIcon: true,
    showClose: true
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: boolean): void;
  (type: 'close'): void;
}>();

const visible = useVModel(props, 'modelValue', emit);
const classNames = computed(() => ({
  'weui-information-bar_warn-strong': props.type === 'warn-primary',
  'weui-information-bar_warn-weak': props.type === 'warn',
  'weui-information-bar_warn-no-color': props.type === 'default',
  'weui-information-bar_tips-strong': props.type === 'tips-primary',
  'weui-information-bar_tips-weak': props.type === 'tips'
}));

const closeHandler = () => {
  visible.value = false;
  emit('close');
};
</script>
