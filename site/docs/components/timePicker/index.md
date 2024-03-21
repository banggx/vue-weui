# 时间选择器 TimePicker

时间选择器常用于表单内选择时间选项

### 基础使用

<custom-time-picker />

::: details 显示代码
```vue
<template>
  <weui-time-picker
    v-model="pickerTime"
    placeholder="请选择时间"
  ></weui-time-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const pickerTime = ref();
</script>
```
:::

### API
#### TimePicker Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | number[] | - | 当前时间值 | - | 
| placeholder | string | - | 占位文案 | - |
| disabled | boolean | false | 是否禁用 | - |
| formatter | (val: number[]) => void; | (val: number[]) => val.join('\:') | 格式化字符串 | - |
| cron | string |'* * *' | cron 表达式，三位，分别是 hout[0-24] minute[0-59] 和 second[0-59]（周日-周六） | - |
| hourFormatter | (val: number) => { label: string; disabled?: boolean }; | - | 格式化选择器时显示 | - |
| minuteFormatter | (val: number) => { label: string; disabled?: boolean }; | - | 格式化选择器分显示 | - |
| secondFormatter | (val: number) => { label: string; disabled?: boolean }; | - | 格式化选择器秒显示 | - |


#### TimePicker Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 选择器选择值变更时回调 | ((val: number[]) => void) | - |
| selectChange  | 选择器选择值改变时回调 | ((val: TimeItem[]) => void) | - |
| change  | 选择器选择值确认时回调 | ((val: TimeItem[]) => void) | - |