<script setup lang="ts">
import { ref } from 'vue'

const selectedDate = ref('')
const dateRange = ref(['2023-01-01', '2023-01-10'])
const disabledDates = ref(['2023-01-01', '2023-01-15', '2023-01-30'])
</script>

<template>
  <div class="demo-container">
    <h3>单选模式</h3>
    <weui-calendar v-model="selectedDate" />
    
    <h3>范围选择模式</h3>
    <weui-calendar v-model="dateRange" mode="range" />
    
    <h3>禁用日期</h3>
    <weui-calendar 
      v-model="selectedDate" 
      :disabled-dates="disabledDates" 
    />
  </div>
</template>

<style scoped>
.demo-container {
  padding: 16px;
}
.demo-container h3 {
  margin: 24px 0 12px 0;
}
</style>