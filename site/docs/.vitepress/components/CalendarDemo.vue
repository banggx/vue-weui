<template>
  <div class="calendar-demo">
    <weui-button type="primary" @click="showCalendar = true">选择日期</weui-button>
    <p v-if="selectedDate" class="calendar-demo-result">
      已选择：{{ formatDate(selectedDate) }}
    </p>
    <weui-calendar-picker
      v-model:show="showCalendar"
      v-model="selectedDate"
      title="选择日期"
      @confirm="onConfirm"
      @clear="onClear"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCalendar = ref(false)
const selectedDate = ref<Date | null>(null)

const onConfirm = (date: Date) => {
  selectedDate.value = date
}

const onClear = () => {
  selectedDate.value = null
}

const formatDate = (date: Date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>

<style scoped>
.calendar-demo {
  padding: 16px 0;
}
.calendar-demo-result {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}
</style>
