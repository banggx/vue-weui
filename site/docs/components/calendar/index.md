# 日历 Calendar

日历组件用于在微信 H5 页面中选择日期，支持单选和范围选择两种模式。适用于预约挂号、活动报名、行程安排等场景。

### 基础使用

通过按钮触发日历弹层，选择日期后点击确认。

<custom-calendar-demo />

::: details 显示代码
```vue
<template>
  <div>
    <weui-button type="primary" @click="showCalendar = true">选择日期</weui-button>
    <weui-calendar-picker
      v-model:show="showCalendar"
      v-model="selectedDate"
      title="选择日期"
      @confirm="onConfirm"
    />
    <p v-if="selectedDate">已选择：{{ formatDate(selectedDate) }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCalendar = ref(false)
const selectedDate = ref<Date | null>(null)

const onConfirm = (date: Date) => {
  selectedDate.value = date
}

const formatDate = (date: Date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>
```
:::

### 范围选择

设置 `type="range"` 开启范围选择模式，用户可先后点击起始日与结束日，高亮中间连续日期区间。

::: details 显示代码
```vue
<template>
  <div>
    <weui-button type="primary" @click="showRange = true">选择日期范围</weui-button>
    <weui-calendar-picker
      v-model:show="showRange"
      v-model="dateRange"
      type="range"
      title="选择日期范围"
      @confirm="onRangeConfirm"
    />
    <p v-if="dateRange">
      {{ formatDate(dateRange[0]) }} 至 {{ formatDate(dateRange[1]) }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showRange = ref(false)
const dateRange = ref<[Date, Date] | null>(null)

const onRangeConfirm = (range: [Date, Date]) => {
  dateRange.value = range
}

const formatDate = (date: Date) => {
  if (!date) return ''
  const d = new Date(date)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
</script>
```
:::

### 禁用日期

通过 `min-date` 和 `max-date` 限制可选范围，或通过 `disabled-dates` 禁用特定日期。

::: details 显示代码
```vue
<template>
  <div>
    <weui-button type="primary" @click="showDisabled = true">选择日期（禁用过去日期）</weui-button>
    <weui-calendar-picker
      v-model:show="showDisabled"
      v-model="disabledDate"
      :min-date="today"
      title="选择未来日期"
      @confirm="onDisabledConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showDisabled = ref(false)
const disabledDate = ref<Date | null>(null)
const today = new Date()

const onDisabledConfirm = (date: Date) => {
  disabledDate.value = date
}
</script>
```
:::

### 自定义标题

通过 `title` 属性自定义弹层顶部标题栏文字。

::: details 显示代码
```vue
<template>
  <div>
    <weui-button type="primary" @click="showCustom = true">选择就诊日期</weui-button>
    <weui-calendar-picker
      v-model:show="showCustom"
      v-model="customDate"
      title="选择就诊日期"
      @confirm="onCustomConfirm"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const showCustom = ref(false)
const customDate = ref<Date | null>(null)

const onCustomConfirm = (date: Date) => {
  customDate.value = date
}
</script>
```
:::

### API

#### CalendarPicker Props

| 名称 | 类型 | 默认值 | 说明 | 版本 |
| ---- | ---- | ------ | ---- | ---- |
| show | boolean | false | 控制弹层显示/隐藏 | - |
| modelValue | Date \| [Date, Date] \| null | null | 当前选中值（单选模式为 Date，范围模式为 [Date, Date]） | - |
| type | 'single' \| 'range' | 'single' | 选择类型：single-单选，range-范围 | - |
| minDate | Date \| null | null | 最小可选日期 | - |
| maxDate | Date \| null | null | 最大可选日期 | - |
| disabledDates | Date[] \| ((date: Date) => boolean) | undefined | 禁用日期（数组或函数） | - |
| title | string | '选择日期' | 弹层标题 | - |
| zIndex | number | 1000 | 弹层层级 | - |

#### CalendarPicker Events

| 名称 | 描述 | 参数 | 版本 |
| ---- | ---- | ---- | ---- |
| update:show | 弹层显示状态变化回调 | (val: boolean) => void | - |
| update:modelValue | 选中值变化回调 | (val: Date \| [Date, Date] \| null) => void | - |
| confirm | 点击确认按钮回调 | (val: Date \| [Date, Date] \| null) => void | - |
| clear | 点击清空按钮回调 | () => void | - |
| close | 弹层关闭回调 | () => void | - |

#### CalendarPicker Slots

| 名称 | 说明 | 版本 |
| ---- | ---- | ---- |
| default | 自定义日历内容区域 | - |
