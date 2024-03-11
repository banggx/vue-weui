<template>
  <div>
    <transition name="weui-fade" :duration="{ enter: 300, leave: 300 }">
      <Mask v-if="visible" />
    </transition>
    <Transition name="weui-fade" :duration="{ enter: 300, leave: 300 }">
      <div v-if="visible" class="weui-dialog">
        <div class="weui-dialog__hd">
          <slot v-if="$slots['hd']" name="hd"></slot>
          <strong v-else class="weui-dialog__title" id="js_title1">{{
            title
          }}</strong>
        </div>
        <div class="weui-dialog__bd">
          <slot v-if="$slots['default']"></slot>
          <template v-else>{{ desc }}</template>
        </div>
        <div class="weui-dialog__ft">
          <slot v-if="$slots['ft']" name="ft"></slot>
          <template v-else>
            <a
              v-if="cancelText"
              role="button"
              href="javascript:"
              class="weui-dialog__btn weui-dialog__btn_default"
              @click="emitCancel"
              >{{ cancelText }}</a
            >
            <a
              v-if="okText"
              role="button"
              href="javascript:"
              class="weui-dialog__btn weui-dialog__btn_primary"
              @click="emitOk"
              >{{ okText }}</a
            >
          </template>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import Mask from '../mask';
import type { Maybe } from 'vue-weui-utils';

defineOptions({
  name: 'weui-dialog'
});
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    desc?: string;
    cancelText?: Maybe<string>;
    okText?: Maybe<string>;
  }>(),
  {
    modelValue: false,
    title: '',
    desc: '',
    cancelText: '取消',
    okText: '确认'
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: boolean): void;
  (type: 'cancel'): void;
  (type: 'ok'): void;
}>();
const visible = useVModel(props, 'modelValue', emit);
const emitCancel = () => {
  visible.value = false;
  emit('cancel');
};
const emitOk = () => {
  visible.value = false;
  emit('ok');
};
</script>
