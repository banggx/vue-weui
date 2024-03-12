<template>
  <weui-navbar v-model="navBar">
    <weui-navbar-item
      v-for="nav in navBars"
      :key="nav.value"
      :label="nav.label"
      :value="nav.value"
    >
      {{ nav.label }}
    </weui-navbar-item>
  </weui-navbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const navBar = ref('menu1');
const navBars = [
  { label: '菜单1', value: 'menu1' },
  { label: '菜单2', value: 'menu2' }
];
</script>