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
    <div 
      class="weui-calendar-days"
      :class="{
        'month-transition': isTransitioning,
        'slide-in-left': slideDirection === 'left',
        'slide-in-right': slideDirection === 'right',
        'slide-out-left': slideDirection === 'left' && isTransitioning,
        'slide-out-right': slideDirection === 'right' && isTransitioning,
        'slide-in-active': !isTransitioning
      }"
    >
      <div
        v-for="date in calendarDays"
        :key="date.key"
        class="weui-calendar-day"
        :class="{
          'weui-calendar-day-empty': !date.date,
          'weui-calendar-day-today': date.isToday,
          'weui-calendar-day-selected': date.isSelected,
          'weui-calendar-day-disabled': date.isDisabled,
          'weui-calendar-day-range': date.isInRange && !date.isSelected && !date.isToday,
          'weui-calendar-day-range-start': date.isRangeStart,
          'weui-calendar-day-range-end': date.isRangeEnd
        }"
        @click="!date.isDisabled && date.date ? selectDate(date) : null"
      >
        {{ date.date ? date.date.date() : '' }}
      </div>
    </div>
    <!-- Action buttons -->
    <div class="weui-calendar-actions" v-if="showActions">
      <button 
        class="weui-calendar-action weui-calendar-action-clear"
        @click="clearSelection"
      >
        清空
      </button>
      <button 
        class="weui-calendar-action weui-calendar-action-confirm"
        @click="confirmSelection"
      >
        确认
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useNow } from '@vueuse/core'
import dayjs from 'dayjs'
import './calendar.less'

// Props
const props = defineProps<{ 
  modelValue?: Date | string | null
  minDate?: Date | string | null
  maxDate?: Date | string | null
  disabledDates?: Date[] | ((date: Date) => boolean)
  showActions?: boolean
}>()

// Emits
const emit = defineEmits<{ 
  (e: 'update:modelValue', value: Date | null): void
  (e: 'change', value: Date | null): void
  (e: 'select', value: Date | null): void
  (e: 'confirm', value: Date | null): void
  (e: 'clear'): void
}>()

// State
const now = useNow()
const currentDate = ref<Date>(props.modelValue ? new Date(props.modelValue) : new Date())
const currentMonth = ref<number>(currentDate.value.getMonth())
const currentYear = ref<number>(currentDate.value.getFullYear())
const isTransitioning = ref<boolean>(false)
const slideDirection = ref<'left' | 'right'>('left')
const showActions = computed(() => props.showActions !== undefined ? props.showActions : false)

// Computed
const weekdays = computed(() => ['日', '一', '二', '三', '四', '五', '六'])

const currentMonthTitle = computed(() => {
  return `${currentYear.value}年${currentMonth.value + 1}月`
})

const isDateDisabled = (date: Date): boolean => {
  // Check if date is in disabledDates array
  if (Array.isArray(props.disabledDates)) {
    return props.disabledDates.some(disabledDate => 
      dayjs(date).isSame(dayjs(disabledDate), 'day')
    )
  }
  
  // Check if disabledDates is a function
  if (typeof props.disabledDates === 'function') {
    return props.disabledDates(date)
  }
  
  return false
}

const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const daysInMonth = lastDay.getDate()
  const firstDayOfWeek = firstDay.getDay()
  
  const days: Array<{ 
    date: Date | null; 
    isToday: boolean; 
    isSelected: boolean; 
    isDisabled: boolean; 
    isInRange: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    key: string 
  }> = []
  
  // Add empty days for previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ 
      date: null, 
      isToday: false, 
      isSelected: false, 
      isDisabled: false, 
      isInRange: false,
      isRangeStart: false,
      isRangeEnd: false,
      key: `empty-${i}` 
    })
  }
  
  // Add days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    const isToday = dayjs(date).isSame(dayjs(), 'day')
    const isSelected = props.modelValue && dayjs(date).isSame(dayjs(props.modelValue), 'day')
    const isDisabled = isDateDisabled(date)
    
    // Range selection logic (simplified for single selection)
    const isInRange = false
    const isRangeStart = false
    const isRangeEnd = false
    
    days.push({ 
      date, 
      isToday, 
      isSelected, 
      isDisabled,
      isInRange,
      isRangeStart,
      isRangeEnd,
      key: `day-${i}` 
    })
  }
  
  // Add empty days for next month
  const totalCells = 42 // 6 weeks * 7 days
  const remainingCells = totalCells - days.length
  for (let i = 1; i <= remainingCells; i++) {
    days.push({ 
      date: null, 
      isToday: false, 
      isSelected: false, 
      isDisabled: false, 
      isInRange: false,
      isRangeStart: false,
      isRangeEnd: false,
      key: `next-empty-${i}` 
    })
  }
  
  return days
})

// Methods
const prevMonth = async () => {
  slideDirection.value = 'right'
  isTransitioning.value = true
  
  await nextTick()
  
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
  
  // Reset transition state after animation
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}

const nextMonth = async () => {
  slideDirection.value = 'left'
  isTransitioning.value = true
  
  await nextTick()
  
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
  
  // Reset transition state after animation
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}

const selectDate = (day: { date: Date | null }) => {
  if (day.date) {
    emit('update:modelValue', day.date)
    emit('change', day.date)
    emit('select', day.date)
  }
}

const clearSelection = () => {
  emit('update:modelValue', null)
  emit('change', null)
  emit('clear')
}

const confirmSelection = () => {
  if (props.modelValue) {
    emit('confirm', new Date(props.modelValue))
  }
}

// Watch modelValue changes
// TODO: Implement watch for modelValue prop changes
</script>