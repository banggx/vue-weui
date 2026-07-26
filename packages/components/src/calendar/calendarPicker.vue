<template>
  <div v-if="show" class="weui-calendar-picker" :style="{ zIndex }">
    <!-- 遮罩层 - 点击关闭 -->
    <div class="weui-calendar-picker-mask" @click="hide"></div>

    <div class="weui-calendar-picker-content" ref="contentRef">
      <!-- 头部：关闭按钮 + 标题 -->
      <div class="weui-calendar-picker-header">
        <h3 class="weui-calendar-picker-title">{{ title }}</h3>
        <!-- 右上角关闭按钮 -->
        <button
          class="weui-calendar-picker-close"
          @click="hide"
          aria-label="关闭"
        >
          <weui-icon name="close" size="20" />
        </button>
      </div>

      <!-- 日历主体 - 绑定滑动手势 -->
      <div class="weui-calendar-picker-body" ref="swipeRef">
        <Calendar
          ref="calendarRef"
          v-model="internalValue"
          :min-date="minDate"
          :max-date="maxDate"
          :disabled-dates="disabledDates"
          :type="type"
          @update:modelValue="onCalendarChange"
        />
      </div>

      <!-- 底部操作栏 -->
      <div class="weui-calendar-picker-footer">
        <!-- 清空按钮 - 仅在已有选中日期时可见 -->
        <button
          v-if="hasSelection"
          class="weui-btn weui-btn_default"
          @click="clear"
        >
          清空
        </button>
        <!-- 确认按钮 -->
        <button class="weui-btn weui-btn_primary" @click="confirm">确认</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import Calendar from './calendar.vue';

import { Icon as WeuiIcon } from '../icon';
import { useLockScroll } from './composables/useLockScroll';
import { useSwipe } from './composables/useSwipe';

defineOptions({
  name: 'WeuiCalendarPicker'
});

// Props
const props = withDefaults(
  defineProps<{
    /** 控制弹层显示/隐藏 */
    show?: boolean;
    /** 当前选中值（单选模式为 Date，范围模式为 [Date, Date]） */
    modelValue?: Date | [Date, Date] | null;
    /** 选择类型：single-单选，range-范围 */
    type?: 'single' | 'range';
    /** 最小可选日期 */
    minDate?: Date | null;
    /** 最大可选日期 */
    maxDate?: Date | null;
    /** 禁用日期（数组或函数） */
    disabledDates?: Date[] | ((date: Date) => boolean);
    /** 弹层标题 */
    title?: string;
    /** 层级 */
    zIndex?: number;
  }>(),
  {
    show: false,
    modelValue: null,
    type: 'single',
    minDate: null,
    maxDate: null,
    disabledDates: undefined,
    title: '选择日期',
    zIndex: 1000
  }
);

// Emits
const emit = defineEmits<{
  (e: 'update:show', value: boolean): void;
  (e: 'update:modelValue', value: Date | [Date, Date] | null): void;
  (e: 'confirm', value: Date | [Date, Date] | null): void;
  (e: 'clear'): void;
  (e: 'close'): void;
}>();

// Refs
const contentRef = ref<HTMLElement | null>(null);
const swipeRef = ref<HTMLElement | null>(null);
const calendarRef = ref<InstanceType<typeof Calendar> | null>(null);

// 内部选中值（用于临时存储未确认的选择）
const internalValue = ref<Date | [Date, Date] | null>(props.modelValue);

// 同步外部 modelValue 到内部
watch(
  () => props.modelValue,
  (newVal) => {
    internalValue.value = newVal;
  }
);

// 计算是否有选中值（用于控制清空按钮显示）
const hasSelection = computed(() => {
  if (!internalValue.value) return false;
  if (Array.isArray(internalValue.value)) {
    return (
      internalValue.value.length === 2 &&
      internalValue.value[0] !== null &&
      internalValue.value[1] !== null
    );
  }
  return internalValue.value !== null;
});

// 滚动锁定
const { lockScroll, unlockScroll } = useLockScroll();

// 滑动手势 - 左右滑动切换月份
useSwipe(swipeRef, {
  threshold: 50,
  onSwipeEnd: (e, direction) => {
    if (!calendarRef.value) return;
    if (direction === 'left') {
      // 向左滑动 -> 下一月
      calendarRef.value.nextMonth();
    } else if (direction === 'right') {
      // 向右滑动 -> 上一月
      calendarRef.value.prevMonth();
    }
  }
});

// 显示弹层
const showPicker = () => {
  emit('update:show', true);
};

// 隐藏弹层
const hide = () => {
  // 重置临时范围选择状态（防止下次打开时残留）
  resetTempState();
  emit('update:show', false);
  emit('close');
};

// 重置临时状态
const resetTempState = () => {
  // 将内部值重置为外部传入的值（丢弃未确认的临时选择）
  internalValue.value = props.modelValue;
  // 重置日历组件内部的临时范围状态
  if (
    calendarRef.value &&
    typeof calendarRef.value.resetTempRange === 'function'
  ) {
    calendarRef.value.resetTempRange();
  }
};

// 确认选择
const confirm = () => {
  emit('update:modelValue', internalValue.value);
  emit('confirm', internalValue.value);
  emit('update:show', false);
};

// 清空选择
const clear = () => {
  internalValue.value = null;
  emit('update:modelValue', null);
  emit('clear');
  // 清空后不关闭弹层，让用户可以继续选择
};

// 日历值变化
const onCalendarChange = (value: Date | [Date, Date] | null) => {
  internalValue.value = value;
};

// 监听 show 变化，处理滚动锁定
watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      // 打开时锁定滚动
      lockScroll();
      // 同步外部值到内部
      internalValue.value = props.modelValue;
    } else {
      // 关闭时解锁滚动
      unlockScroll();
      // 重置临时状态
      resetTempState();
    }
  },
  { immediate: true }
);

// ESC 键关闭
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    hide();
  }
};

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('keydown', handleKeydown);
  }
  // 确保解锁
  unlockScroll();
});

// 暴露方法
defineExpose({
  show: showPicker,
  hide,
  confirm,
  clear
});
</script>

<style scoped>
.weui-calendar-picker {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.weui-calendar-picker-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}

.weui-calendar-picker-content {
  position: relative;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  background: #fff;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.weui-calendar-picker-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #e5e5e5;
}

.weui-calendar-picker-title {
  margin: 0;
  font-size: 17px;
  font-weight: 500;
  color: #333;
  flex: 1;
  text-align: center;
}

.weui-calendar-picker-close {
  position: absolute;
  right: 12px;
  top: 12px;
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
}

.weui-calendar-picker-close:active {
  opacity: 0.6;
}

.weui-calendar-picker-body {
  flex: 1;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}

.weui-calendar-picker-footer {
  display: flex;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  border-top: 1px solid #e5e5e5;
  gap: 12px;
}

.weui-calendar-picker-footer .weui-btn {
  flex: 1;
  height: 44px;
  font-size: 17px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

.weui-calendar-picker-footer .weui-btn_default {
  color: #333;
  background: #f5f5f5;
}

.weui-calendar-picker-footer .weui-btn_default:active {
  background: #e5e5e5;
}

.weui-calendar-picker-footer .weui-btn_primary {
  color: #fff;
  background: #07c160;
}

.weui-calendar-picker-footer .weui-btn_primary:active {
  background: #06ad56;
}
</style>
