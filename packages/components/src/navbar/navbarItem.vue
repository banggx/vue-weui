<template>
  <div
    v-show="activeTab === value"
    role="tabpanel"
    id="panel1"
    aria-labelledby="tab1"
    class="weui-tab__panel"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { ACTIVE_TAB, NAVBAR_ITEM_NAME } from './constant';
import type { Maybe } from '../types';

defineOptions({
  name: NAVBAR_ITEM_NAME
});
withDefaults(
  defineProps<{
    label: string;
    value: any;
  }>(),
  {
    label: ''
  }
);
const activeTab = inject(ACTIVE_TAB) as Maybe<any>;
</script>
