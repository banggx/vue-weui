<template>
  <weui-date-picker
    v-model="pickerDate"
    placeholder="请选择日期"
  ></weui-date-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const pickerDate = ref();
</script>