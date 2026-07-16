<template>
  <div v-if="visible" class="weui-calendar-picker" :style="{ zIndex: zIndex }">
    <Mask @click="hide" />
    <div class="weui-calendar-picker-content" @click.stop>
      <div class="weui-calendar-picker-header">
        <button class="weui-calendar-picker-close" @click="hide">
          <weui-icon name="close" size="20" />
        </button>
        <h3 class="weui-calendar-picker-title">{{ title }}</h3>
      </div>
      <div class="weui-calendar-picker-body">
        <Calendar
          v-model="modelValue"
          :min-date="minDate"
          :max-date="maxDate"
          :disabled-dates="disabledDates"
          @update:modelValue="onUpdateModelValue"
          @change="onChange"
          @select="onSelect"
        />
      </div>
      <div class="weui-calendar-picker-footer">
        <button class="weui-btn weui-btn_default" @click="hide">取消</button>
        <button class="weui-btn weui-btn_primary" @click="confirm">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useVModel } from '@vueuse/core'
import { registerPicker, unregisterPicker } from '../utils/pickerManager'
import Calendar from './calendar.vue'
import Mask from '../mask'
import { Icon as WeuiIcon } from '../icon'

// Props
const props = defineProps<{ 
  modelValue?: Date | string | null
  minDate?: Date | string | null
  maxDate?: Date | string | null
  disabledDates?: Date[] | ((date: Date) => boolean)
  title?: string
}>()

// Emits
const emit = defineEmits<{ 
  (e: 'update:modelValue', value: Date | null): void
  (e: 'change', value: Date | null): void
  (e: 'select', value: Date | null): void
  (e: 'confirm', value: Date | null): void
  (e: 'cancel'): void
}>()

// State
const visible = ref(false)
const zIndex = ref(10000)
const modelValue = useVModel(props, 'modelValue', emit)

// Computed
const title = computed(() => props.title || '选择日期')

// Methods
const show = () => {
  visible.value = true
  // Lock body scroll
  document.body.style.overflow = 'hidden'
  
  // Set z-index higher than other components
  zIndex.value = 10000
  
  // Register with pickerManager
  const pickerInstance = {
    hide: hide,
    show: show
  }
  
  // Store reference to picker instance
  ;(pickerInstance as any).__pickerRef = pickerInstance
  
  registerPicker(pickerInstance as any)
}

const hide = () => {
  visible.value = false
  // Unlock body scroll
  document.body.style.overflow = ''
  
  // Unregister from pickerManager
  unregisterPicker((pickerInstance as any).__pickerRef)
  
  emit('cancel')
}

const confirm = () => {
  emit('confirm', modelValue.value)
  hide()
}

const onUpdateModelValue = (value: Date | null) => {
  emit('update:modelValue', value)
  emit('change', value)
}

const onChange = (value: Date | null) => {
  emit('change', value)
}

const onSelect = (value: Date | null) => {
  emit('select', value)
}

// ESC key handler
const handleEscKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && visible.value) {
    hide()
  }
}

// Click outside handler
const handleClickOutside = (e: MouseEvent) => {
  if (visible.value && !e.target.closest('.weui-calendar-picker')) {
    hide()
  }
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey)
  document.removeEventListener('click', handleClickOutside)
  
  // Ensure cleanup
  if (visible.value) {
    document.body.style.overflow = ''
  }
})

// Expose methods for pickerManager
defineExpose({
  show,
  hide
})
</script>

<style scoped>
.weui-calendar-picker {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
}

.weui-calendar-picker-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  overflow: hidden;
}

.weui-calendar-picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.weui-calendar-picker-close {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #999;
}

.weui-calendar-picker-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #333;
}

.weui-calendar-picker-body {
  padding: 16px;
}

.weui-calendar-picker-footer {
  display: flex;
  padding: 12px 16px;
  border-top: 1px solid #e5e5e5;
}

.weui-calendar-picker-footer .weui-btn {
  flex: 1;
  margin: 0 4px;
  padding: 10px;
  font-size: 14px;
}

.weui-calendar-picker-footer .weui-btn_default {
  color: #333;
  background: #f5f5f5;
}

.weui-calendar-picker-footer .weui-btn_primary {
  color: white;
  background: #09bb07;
}
</style>