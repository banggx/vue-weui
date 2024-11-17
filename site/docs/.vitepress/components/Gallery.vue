<template>
  <weui-button @click="visible = !visible">打开画廊</weui-button>
  <weui-gallery
    :visible="visible"
    :initial-index="current"
    :urls="images"
    @close="visible = false"
  ></weui-gallery>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const images = ref([
  `https://picsum.photos/300/200?uid=${Math.random()}`,
  `https://picsum.photos/300/200?uid=${Math.random()}`
]);
const current = ref(1);
</script>