<template>
  <weui-picker
    v-model="pickerData"
    :options="pickerOptions"
    placeholder="请选择内容"
  ></weui-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const pickerData = ref(1);
const pickerOptions = [
  { label: 'label1', value: 1, disabled: true },
  { label: 'label2', value: 2 },
  { label: 'label3', value: 3 },
  { label: 'label4', value: 4 },
  { label: 'label5', value: 5 }
];
</script>