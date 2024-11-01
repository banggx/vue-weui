<template>
  <weui-button @click="visible = true">打开拖拽半屏</weui-button>
  <weui-half-screen-dialog
    v-model="visible"
    slide
    @close="closeHandler"
  >
    可拖拽 HalfScreen
  </weui-half-screen-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const closeHandler = () => {
  console.log('close')
};
</script>