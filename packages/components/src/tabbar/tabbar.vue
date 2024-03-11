<template>
  <div class="weui-tab">
    <slot></slot>
    <div role="tablist" aria-label="选项卡标题" class="weui-tabbar">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        role="tab"
        aria-labelledby="t4_title"
        aria-selected="false"
        aria-controls="panel4"
        class="weui-tabbar__item"
        :class="{ 'weui-bar__item_on': activeKey === item.value }"
        wah-hotarea="click"
        @click="selectTab(item)"
      >
        <slot v-if="$slots['tab']" name="tab" :tab="item"></slot>
        <template v-else>
          <img :src="item.icon" alt="" class="weui-tabbar__icon" />
          <p class="weui-tabbar__label" aria-hidden="true" id="t4_title">
            {{ item.label }}
          </p>
        </template>
      </div>
    </div>
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
import { ACTIVE_TAB, TABBAR_NAME, TABBAR_ITEM_NAME } from './constant';
import { useVModel } from '@vueuse/core';
import { TabBarItem } from './types';

defineOptions({
  name: TABBAR_NAME
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
const activeKey = useVModel(props, 'modelValue', emit);
const tabs = ref<TabBarItem[]>([]);
const instance = getCurrentInstance();

const selectTab = (tab: TabBarItem) => {
  activeKey.value = tab.value;
  emit('change', tab.value);
};

provide(ACTIVE_TAB, activeKey);

onBeforeMount(() => {
  const defaultChildren = instance?.slots.default?.()?.[0].children || [];
  const barSlots = Array.from(defaultChildren as VNodeArrayChildren).filter(
    (vnode: any) => vnode?.type?.name === TABBAR_ITEM_NAME
  ) as VNode[];
  tabs.value = barSlots
    .map(({ props }) => {
      return props;
    })
    .filter(Boolean) as TabBarItem[];
});
</script>
