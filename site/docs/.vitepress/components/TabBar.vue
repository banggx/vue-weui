<template>
  <weui-tabbar v-model="tabBar">
    <weui-tabbar-item
      v-for="tab in tabBars"
      :key="tab.value"
      :label="tab.label"
      :value="tab.value"
      :icon="tab.icon"
    >
      {{ tab.label }} ---- Tab
    </weui-tabbar-item>
  </weui-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const tabBar = ref('menu1');
const tabBars = [
  { label: '菜单1', value: 'menu1', icon: 'https://weui.io/images/icon_tabbar.png' },
  { label: '菜单2', value: 'menu2', icon: 'https://weui.io/images/icon_tabbar.png' }
];
</script>