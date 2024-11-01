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
        ref="dialogRef"
        id="js_dialog"
        :class="dialogClassnames"
      >
        <div v-if="slide" class="weui-half-screen-dialog__hd">
          <div
            id="js_line"
            class="weui-half-screen-dialog__slide-icon"
            style="height: 4px; border-radius: 2px"
          >
            <i id="js_arrow" class="weui-icon-arrow" style="opacity: 0"></i>
          </div>
        </div>
        <div v-else class="weui-half-screen-dialog__hd">
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
import { computed, ref } from 'vue';
import { useVModel } from '@vueuse/core';
import Mask from '../mask';
import Icon from '../icon';
import { useSlideDialog } from '../hooks/useSlideDialog';

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
    slide?: boolean; // slide down 拖拽半屏效果
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
const dialogRef = ref<HTMLElement | null>(null);

const dialogClassnames = computed(() => [
  'js_dialog weui-half-screen-dialog weui-half-screen-dialog_show',
  {
    'weui-half-screen-dialog_slide': props.slide
  }
]);

const closeHandler = () => {
  visible.value = false;
  emit('close');
};

props.slide && useSlideDialog(visible, dialogRef, closeHandler);
</script>
