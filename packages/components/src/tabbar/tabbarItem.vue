<template>
  <div
    v-show="activeKey === value"
    id="panel1"
    role="tabpanel"
    aria-labelledby="tab1"
    class="weui-tab__panel"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup generic="T = any">
import { inject } from 'vue';
import { ACTIVE_TAB, TABBAR_ITEM_NAME } from './constant';
import { Maybe } from '../types';

defineOptions({
  name: TABBAR_ITEM_NAME
});
withDefaults(
  defineProps<{
    label: string;
    value: T;
    icon: string;
  }>(),
  {}
);
const activeKey = inject<Maybe<T>>(ACTIVE_TAB);
</script>
