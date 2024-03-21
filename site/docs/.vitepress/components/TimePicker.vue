<template>
  <weui-time-picker
    v-model="pickerTime"
    placeholder="请选择时间"
  ></weui-time-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const pickerTime = ref();
</script>