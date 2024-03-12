<template>
  <weui-button @click="visible = true">打开Alert</weui-button>
  <weui-alert
    v-model="visible"
    type="warn-primary"
    text="测试测试测试"
  ></weui-alert>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>