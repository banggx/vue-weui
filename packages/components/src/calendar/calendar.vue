<template>
  <div class="weui-calendar">
    <div class="weui-calendar-header">
      <button class="weui-calendar-nav weui-calendar-prev" @click="prevMonth">
        <weui-icon name="arrow-left" size="16" />
      </button>
      <h3 class="weui-calendar-title">{{ currentMonthTitle }}</h3>
      <button class="weui-calendar-nav weui-calendar-next" @click="nextMonth">
        <weui-icon name="arrow-right" size="16" />
      </button>
    </div>
    <div class="weui-calendar-weekdays">
      <div v-for="day in weekdays" :key="day" class="weui-calendar-weekday">{{ day }}</div>
    </div>
    <div class="weui-calendar-days">
      <div
        v-for="date in calendarDays"
        :key="date.key"
        class="weui-calendar-day"
        :class="{ 'weui-calendar-day-empty': !date.date, 'weui-calendar-day-today': date.isToday, 'weui-calendar-day-selected': date.isSelected }"
        @click="selectDate(date)"
      >
        {{ date.date ? date.date.date() : '' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNow } from '@vueuse/core'
import dayjs from 'dayjs'

// Props
const props = defineProps<{
  modelValue?: Date | string | null
  minDate?: Date | string | null
  maxDate?: Date | string | null
  disabledDates?: (date: Date) => boolean
}>()

// Emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: Date | null): void
  (e: 'change', value: Date | null): void
  (e: 'select', value: Date | null): void
}>()

// State
const now = useNow()
const currentDate = ref<Date>(props.modelValue ? new Date(props.modelValue) : new Date())
const currentMonth = ref<number>(currentDate.value.getMonth())
const currentYear = ref<number>(currentDate.value.getFullYear())

// Computed
const weekdays = computed(() => ['日', '一', '二', '三', '四', '五', '六'])

const currentMonthTitle = computed(() => {
  return `${currentYear.value}年${currentMonth.value + 1}月`
})

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const daysInMonth = lastDay.getDate()
  const firstDayOfWeek = firstDay.getDay()
  
  const days: Array<{ date: Date | null; isToday: boolean; isSelected: boolean; key: string }> = []
  
  // Add empty days for previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ date: null, isToday: false, isSelected: false, key: `empty-${i}` })
  }
  
  // Add days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    const isToday = dayjs(date).isSame(dayjs(), 'day')
    const isSelected = props.modelValue && dayjs(date).isSame(dayjs(props.modelValue), 'day')
    
    days.push({ 
      date, 
      isToday, 
      isSelected, 
      key: `day-${i}` 
    })
  }
  
  // Add empty days for next month
  const totalCells = 42 // 6 weeks * 7 days
  const remainingCells = totalCells - days.length
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ date: null, isToday: false, isSelected: false, key: `next-empty-${i}` })
  }
  
  return days
})

// Methods
const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectDate = (day: { date: Date | null }) => {
  if (day.date) {
    emit('update:modelValue', day.date)
    emit('change', day.date)
    emit('select', day.date)
  }
}

// Watch modelValue changes
// TODO: Implement watch for modelValue prop changes
</script>

<style scoped>
.weui-calendar {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.weui-calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.weui-calendar-nav {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #333;
}

.weui-calendar-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.weui-calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 16px;
  background-color: #f5f5f5;
}

.weui-calendar-weekday {
  text-align: center;
  font-size: 14px;
  color: #999;
  font-weight: 400;
}

.weui-calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 8px 16px;
}

.weui-calendar-day {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.weui-calendar-day:hover:not(.weui-calendar-day-empty):not(.weui-calendar-day-selected) {
  background-color: #f5f5f5;
}

.weui-calendar-day-empty {
  visibility: hidden;
}

.weui-calendar-day-today {
  color: #09bb07;
  font-weight: 500;
}

.weui-calendar-day-selected {
  background-color: #09bb07;
  color: white;
}
</style>