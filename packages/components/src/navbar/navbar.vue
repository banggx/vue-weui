<template>
  <div class="weui-tab">
    <div class="weui-navbar">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        role="tab"
        aria-selected="false"
        aria-controls="panel1"
        class="weui-navbar__item"
        wah-hotarea="click"
        @click="selectNavTab(tab)"
      >
        {{ tab.label }}
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup generic="T = any">
import {
  ref,
  provide,
  onBeforeMount,
  getCurrentInstance,
  VNodeArrayChildren,
  VNode
} from 'vue';
import { useVModel } from '@vueuse/core';
import { ACTIVE_TAB, NAVBAR_ITEM_NAME, NAVBAR_NAME } from './constant';
import type { NavBarItem } from './types';

defineOptions({
  name: NAVBAR_NAME
});
const props = withDefaults(
  defineProps<{
    modelValue: T;
  }>(),
  {}
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: T): void;
  (type: 'change', val: T): void;
}>();
const activeTab = useVModel(props, 'modelValue', emit);
const tabs = ref<NavBarItem<T>[]>([]);
const instance = getCurrentInstance();

const selectNavTab = (tab: NavBarItem) => {
  activeTab.value = tab.value;
  emit('change', tab.value);
};

provide(ACTIVE_TAB, activeTab);

onBeforeMount(() => {
  const defaultChildren = instance?.slots.default?.()?.[0].children || [];
  const barSlots = Array.from(defaultChildren as VNodeArrayChildren).filter(
    (vnode: any) => vnode?.type?.name === NAVBAR_ITEM_NAME
  ) as VNode[];
  tabs.value = barSlots
    .map(({ props }) => {
      return props;
    })
    .filter(Boolean) as NavBarItem[];
});
</script>
