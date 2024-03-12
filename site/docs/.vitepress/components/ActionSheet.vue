<template>
  <weui-button @click="visibleActionSheet = true">打开action-sheet</weui-button>
  <weui-action-sheet
    v-model="visibleActionSheet"
    :menus="menus"
    title="这是标题"
    :actions="actions"
  ></weui-action-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visibleActionSheet = ref(false);
const menus = [
  { label: '菜单1', id: 1 },
  { label: '菜单2', id: 2 }
];
const actions = [{ label: '取消', key: 'cancel' }];
</script>