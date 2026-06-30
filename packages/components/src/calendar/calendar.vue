<template>
  <div 
    v-if="show" 
    class="weui-calendar-popup" 
    :style="{ zIndex: zIndex }"
    @click="handleClickOutside"
  >
    <!-- Background mask -->
    <div 
      class="weui-calendar-mask" 
      @click="hide"
      :class="{ 'weui-calendar-mask-active': show }"
    ></div>
    
    <!-- Calendar content -->
    <div 
      class="weui-calendar-popup-content" 
      @click.stop
      :class="{ 'weui-calendar-popup-content-active': show }"
    >
      <!-- Header with close button -->
      <div class="weui-calendar-popup-header">
        <button 
          class="weui-calendar-popup-close" 
          @click="hide"
          aria-label="关闭"
        >
          <weui-icon name="close" size="20" />
        </button>
        <h3 class="weui-calendar-popup-title">{{ title }}</h3>
      </div>
      
      <!-- Calendar body -->
      <div class="weui-calendar-popup-body">
        <div class="weui-calendar" ref="calendarRef">
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
            ref="daysRef"
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
                'weui-calendar-day-range-end': date.isRangeEnd,
                'weui-calendar-day-range-middle': date.isRangeMiddle
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, onBeforeUnmount } from 'vue'
import { useNow } from '@vueuse/core'
import dayjs from 'dayjs'
import './calendar.less'
import { useSwipe } from './composables/useSwipe'
import { useLockScroll } from '../utils/useLockScroll'

// Props
const props = defineProps<{ 
  modelValue?: Date | string | null
  minDate?: Date | string | null
  maxDate?: Date | string | null
  disabledDates?: Date[] | ((date: Date) => boolean)
  showActions?: boolean
  mode?: 'single' | 'range'
  show?: boolean
  title?: string
}>()

// Emits
const emit = defineEmits<{ 
  (e: 'update:modelValue', value: Date | null | [Date, Date]): void
  (e: 'change', value: Date | null | [Date, Date]): void
  (e: 'select', value: Date | null | [Date, Date]): void
  (e: 'confirm', value: Date | null | [Date, Date]): void
  (e: 'clear'): void
  (e: 'update:show', value: boolean): void
  (e: 'hide'): void
  (e: 'show'): void
}>()

// State
const now = useNow()
const currentDate = ref<Date>(props.modelValue ? new Date(props.modelValue) : new Date())
const currentMonth = ref<number>(currentDate.value.getMonth())
const currentYear = ref<number>(currentDate.value.getFullYear())
const isTransitioning = ref<boolean>(false)
const slideDirection = ref<'left' | 'right'>('left')
const showActions = computed(() => props.showActions !== undefined ? props.showActions : false)
const mode = computed(() => props.mode || 'single')
const title = computed(() => props.title || '选择日期')
const zIndex = ref(10000)

// Refs for DOM elements
const calendarRef = ref<HTMLElement | null>(null)
const daysRef = ref<HTMLElement | null>(null)

// Selected dates state
const selectedDate = ref<Date | null>(props.modelValue ? new Date(props.modelValue) : null)
const startDate = ref<Date | null>(null)
const endDate = ref<Date | null>(null)

// Initialize range selection if modelValue is an array
if (Array.isArray(props.modelValue) && props.modelValue.length === 2) {
  startDate.value = new Date(props.modelValue[0])
  endDate.value = new Date(props.modelValue[1])
}

// Computed
const weekdays = computed(() => ['日', '一', '二', '三', '四', '五', '六'])

const currentMonthTitle = computed(() => {
  return `${currentYear.value}年${currentMonth.value + 1}月`
})

const isDateDisabled = (date: Date): boolean => {
  // Check minDate
  if (props.minDate && dayjs(date).isBefore(dayjs(props.minDate), 'day')) {
    return true
  }
  
  // Check maxDate
  if (props.maxDate && dayjs(date).isAfter(dayjs(props.maxDate), 'day')) {
    return true
  }
  
  // Check disabledDates array
  if (Array.isArray(props.disabledDates)) {
    return props.disabledDates.some(disabledDate => 
      dayjs(date).isSame(dayjs(disabledDate), 'day')
    )
  }
  
  // Check disabledDates function
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
    isRangeMiddle: boolean;
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
      isRangeMiddle: false,
      key: `empty-${i}` 
    })
  }
  
  // Add days for current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    const isToday = dayjs(date).isSame(dayjs(), 'day')
    
    // Determine selection state based on mode
    let isSelected = false
    let isRangeStart = false
    let isRangeEnd = false
    let isRangeMiddle = false
    let isInRange = false
    
    if (mode.value === 'single') {
      isSelected = props.modelValue && dayjs(date).isSame(dayjs(props.modelValue), 'day')
    } else {
      // Range mode
      if (startDate.value && endDate.value) {
        const isSameAsStart = dayjs(date).isSame(dayjs(startDate.value), 'day')
        const isSameAsEnd = dayjs(date).isSame(dayjs(endDate.value), 'day')
        
        isRangeStart = isSameAsStart
        isRangeEnd = isSameAsEnd
        
        if (isSameAsStart || isSameAsEnd) {
          isSelected = true
        }
        
        // Check if date is in range
        isInRange = dayjs(date).isSameOrAfter(dayjs(startDate.value), 'day') && 
                    dayjs(date).isSameOrBefore(dayjs(endDate.value), 'day')
        
        // Mark middle days of range
        if (isInRange && !isSameAsStart && !isSameAsEnd) {
          isRangeMiddle = true
        }
      }
    }
    
    const isDisabled = isDateDisabled(date)
    
    days.push({ 
      date, 
      isToday, 
      isSelected, 
      isDisabled,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isRangeMiddle,
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
      isRangeMiddle: false,
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
  if (!day.date) return
  
  if (mode.value === 'single') {
    emit('update:modelValue', day.date)
    emit('change', day.date)
    emit('select', day.date)
  } else {
    // Range mode logic
    if (!startDate.value) {
      // First selection - set as start date
      startDate.value = day.date
      endDate.value = null
      
      // Emit array with just start date for now
      emit('update:modelValue', [day.date, null])
      emit('change', [day.date, null])
      emit('select', [day.date, null])
    } else if (!endDate.value) {
      // Second selection - set as end date
      if (dayjs(day.date).isBefore(dayjs(startDate.value), 'day')) {
        // If selected date is before start date, swap them
        endDate.value = startDate.value
        startDate.value = day.date
      } else {
        endDate.value = day.date
      }
      
      // Emit complete range
      emit('update:modelValue', [startDate.value, endDate.value])
      emit('change', [startDate.value, endDate.value])
      emit('select', [startDate.value, endDate.value])
    } else {
      // Reset and start new range
      startDate.value = day.date
      endDate.value = null
      
      emit('update:modelValue', [day.date, null])
      emit('change', [day.date, null])
      emit('select', [day.date, null])
    }
  }
}

const clearSelection = () => {
  if (mode.value === 'single') {
    emit('update:modelValue', null)
    emit('change', null)
    emit('clear')
  } else {
    startDate.value = null
    endDate.value = null
    emit('update:modelValue', null)
    emit('change', null)
    emit('clear')
  }
}

const confirmSelection = () => {
  if (mode.value === 'single') {
    if (props.modelValue) {
      emit('confirm', new Date(props.modelValue))
    }
  } else {
    if (startDate.value && endDate.value) {
      emit('confirm', [startDate.value, endDate.value])
    }
  }
}

// Swipe functionality
onMounted(() => {
  if (daysRef.value) {
    useSwipe(daysRef.value, {
      threshold: 50,
      onSwipeEnd: (e, direction, distance) => {
        if (direction === 'left') {
          nextMonth()
        } else if (direction === 'right') {
          prevMonth()
        }
      }
    })
  }
})

// Watch modelValue changes
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    if (mode.value === 'single') {
      selectedDate.value = newValue instanceof Date ? newValue : new Date(newValue)
    } else if (Array.isArray(newValue) && newValue.length === 2) {
      startDate.value = newValue[0] instanceof Date ? newValue[0] : new Date(newValue[0])
      endDate.value = newValue[1] instanceof Date ? newValue[1] : new Date(newValue[1])
    }
  }
}, { immediate: true })

// Popup lifecycle methods
const show = () => {
  if (props.show) return
  
  emit('update:show', true)
  emit('show')
}

const hide = () => {
  if (!props.show) return
  
  emit('update:show', false)
  emit('hide')
}

// ESC key handler
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    hide()
  }
}

// Click outside handler
const handleClickOutside = (e: MouseEvent) => {
  if (props.show && e.target === e.currentTarget) {
    hide()
  }
}

// Scroll locking
const { lockScroll, unlockScroll } = useLockScroll()

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
  
  // Lock scroll when popup is shown
  if (props.show) {
    const cleanup = lockScroll()
    
    // Cleanup function to unlock scroll
    onBeforeUnmount(() => {
      if (cleanup) {
        cleanup()
      }
    })
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleEscKey)
})

// Watch show prop for scroll locking/unlocking
watch(() => props.show, (newVal, oldVal) => {
  if (newVal && !oldVal) {
    // Show -> lock scroll
    const cleanup = lockScroll()
    
    // Store cleanup function for later
    ;(lockScroll as any).__cleanup = cleanup
  } else if (!newVal && oldVal) {
    // Hide -> unlock scroll
    if ((lockScroll as any).__cleanup) {
      (lockScroll as any).__cleanup()
      delete (lockScroll as any).__cleanup
    }
  }
})

// Expose methods for external control
defineExpose({
  show,
  hide
})
</script>

<style scoped>
.weui-calendar-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weui-calendar-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.weui-calendar-mask-active {
  opacity: 1;
}

.weui-calendar-popup-content {
  position: relative;
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  overflow: hidden;
  transform: scale(0.9);
  opacity: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  z-index: 1;
}

.weui-calendar-popup-content-active {
  transform: scale(1);
  opacity: 1;
}

.weui-calendar-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.weui-calendar-popup-close {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
}

.weui-calendar-popup-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.weui-calendar-popup-body {
  padding: 16px;
}

.weui-calendar-actions {
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #e5e5e5;
}

.weui-calendar-action {
  flex: 1;
  margin: 0 4px;
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.weui-calendar-action-clear {
  background: #f5f5f5;
  color: #333;
}

.weui-calendar-action-confirm {
  background: #09bb07;
  color: white;
}
</style>