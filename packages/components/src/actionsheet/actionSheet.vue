<template>
  <div>
    <Transition name="weui-fade" :duration="{ enter: 300, leave: 300 }">
      <Mask v-if="visible" @click="closeHandler" />
    </Transition>
    <Transition name="weui-fade" :duration="{ enter: 300, leave: 300 }">
      <div
        v-if="visible"
        id="iosActionsheet"
        role="dialog"
        aria-modal="true"
        tabindex="0"
        aria-hidden="false"
        class="weui-actionsheet weui-actionsheet_toggle"
      >
        <div v-if="title || $slots['title']" class="weui-actionsheet__title">
          <slot v-if="$slots['title']" name="title"></slot>
          <p v-else class="weui-actionsheet__title-text">{{ title }}</p>
        </div>
        <div class="weui-actionsheet__menu">
          <div
            v-for="(menu, index) in menus"
            :key="index"
            tabindex="0"
            role="button"
            class="weui-actionsheet__cell"
            :class="menu.classNames"
            @click="clickHandler(menu)"
          >
            <slot v-if="$slots['menu']" :menu="menu" name="menu"></slot>
            <template v-else>{{ menu.label }}</template>
          </div>
        </div>
        <div v-if="actions.length !== 0" class="weui-actionsheet__action">
          <div
            v-for="(action, index) in actions"
            :key="index"
            role="button"
            tabindex="0"
            class="weui-actionsheet__cell"
            id="iosActionsheetCancel"
            wah-hotarea="click"
            @click="clickHandler(action)"
          >
            <slot v-if="$slots['action']" :action="action" name="action"></slot>
            <template v-else>{{ action.label }}</template>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import Mask from '../mask';
import type { ActionSheetMenuOrActions } from './types';

defineOptions({
  name: 'weui-action-sheet'
});

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    menus?: ActionSheetMenuOrActions[];
    actions?: ActionSheetMenuOrActions[];
  }>(),
  {
    modelValue: false,
    title: '',
    menus: () => [],
    actions: () => []
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: boolean): void;
  (type: 'click', val: ActionSheetMenuOrActions): void;
  (type: 'close'): void;
}>();
const visible = useVModel(props, 'modelValue', emit);
const closeHandler = () => {
  visible.value = false;
  emit('close');
};
const clickHandler = (item: ActionSheetMenuOrActions) => {
  emit('click', item);
  closeHandler();
};
</script>
