<template>
  <div
    id="dialogWrap1"
    class="js_dialog_wrap"
    ref="showDialog1"
    aria-labelledby="js_title1"
    role="dialog"
    aria-modal="true"
    aria-hidden="false"
    style="opacity: 1"
    tabindex="0"
  >
    <Transition name="weui-fade" :duration="{ enter: 300, leave: 300 }">
      <Mask v-if="visible" @click="closeHandler" />
    </Transition>
    <Transition name="weui-slide-up" :duration="{ enter: 300, leave: 300 }">
      <div
        v-if="visible"
        id="js_dialog_1"
        class="js_dialog weui-half-screen-dialog weui-half-screen-dialog_show"
      >
        <div class="weui-half-screen-dialog__hd">
          <div
            v-if="showClose"
            class="weui-half-screen-dialog__hd__side"
            @click="closeHandler"
          >
            <button
              class="js_close weui-btn_icon weui-wa-hotarea"
              wah-hotarea="click"
            >
              <Icon :type="iconType" />
            </button>
          </div>
          <div class="weui-half-screen-dialog__hd__main">
            <slot v-if="$slots['hd']" name="hd"></slot>
            <template v-else>
              <strong
                v-if="title"
                class="weui-half-screen-dialog__title"
                id="js_title1"
                >{{ title }}</strong
              >
              <span v-if="subTitle" class="weui-half-screen-dialog__subtitle">{{
                subTitle
              }}</span>
            </template>
          </div>
          <div
            v-if="$slots['extra']"
            class="weui-half-screen-dialog__hd__extra weui-half-screen-dialog__hd__side"
          >
            <slot name="extra"></slot>
          </div>
        </div>
        <div class="weui-half-screen-dialog__bd">
          <slot></slot>
        </div>
        <div v-if="$slots['ft']" class="weui-half-screen-dialog__ft">
          <slot name="ft"></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import Mask from '../mask';
import Icon from '../icon';

defineOptions({
  name: 'weui-half-screen-dialog'
});
const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    showClose?: boolean;
    title?: string;
    subTitle?: string;
    iconType?: 'close' | 'slide-down';
  }>(),
  {
    modelValue: false,
    showClose: true,
    title: '',
    subTitle: '',
    iconType: 'close'
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: boolean): void;
  (type: 'close'): void;
}>();
const visible = useVModel(props, 'modelValue', emit);

const closeHandler = () => {
  visible.value = false;
  emit('close');
};
</script>
