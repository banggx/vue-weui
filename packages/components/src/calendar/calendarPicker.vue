<template>
  <HalfScreenDialog
    v-model="showState"
    :title="title"
    :show-close="true"
    @close="hide"
  >
    <!-- 确认按钮 - 放在半屏头部右侧 -->
    <template #extra>
      <weui-btn type="primary" size="mini" @click="confirm">
        确认
      </weui-btn>
    </template>

    <!-- 日历主体 - 绑定滑动手势 -->
    <div class="weui-calendar-picker-body" ref="swipeRef">
      <Calendar
        ref="calendarRef"
        v-model="internalValue"
        :min-date="minDate"
        :max-date="maxDate"
        :disabled-dates="disabledDates"
        :mode="type"
        @update:modelValue="onCalendarChange"
      />
    </div>
  </HalfScreenDialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import Calendar from './calendar.vue';
import HalfScreenDialog from '../halfScreenDialog/halfScreenDialog.vue';
import Button from '../button/button.vue';
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

// 显示状态 - 使用 computed 同步 props.show
const showState = computed({
  get: () => props.show,
  set: (val: boolean) => emit('update:show', val)
});

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

// 监听 show 变化，同步内部值
watch(
  () => props.show,
  (newShow) => {
    if (newShow) {
      // 打开时同步外部值到内部
      internalValue.value = props.modelValue;
    } else {
      // 关闭时重置临时状态
      resetTempState();
    }
  }
);

// 暴露方法
defineExpose({
  show: showPicker,
  hide,
  confirm,
  clear
});
</script>

<style scoped>
/* 日历主体 - 不滚动，高度自适应内容 */
.weui-calendar-picker-body {
  overflow: visible;
}
</style>
