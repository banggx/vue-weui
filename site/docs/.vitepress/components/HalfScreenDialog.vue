<template>
  <weui-button @click="visible = true">打开HalfScreen</weui-button>
  <weui-half-screen-dialog
    v-model="visible"
    icon-type="slide-down"
    title="测试"
    sub-title="副标题"
    @close="closeHandler"
  >
    HalfScreen
  </weui-half-screen-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const closeHandler = () => {
  console.log('close')
};
</script>