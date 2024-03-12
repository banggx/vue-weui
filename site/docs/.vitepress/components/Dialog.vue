<template>
  <weui-button @click="visible = true">打开dialog</weui-button>
  <weui-dialog
    v-model="visible"
    title="这是标题"
    desc="描述"
    @cancel="cancelHandler"
    @ok="okHandler"
  ></weui-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const cancelHandler = () => {
  console.log('cancel')
};
const okHandler = () => {
  console.log('ok')
};
</script>