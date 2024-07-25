# 日期选择器 DatePicker

日期选择器常用于表单内选择日期选项

### 基础使用

<custom-date-picker />

::: details 显示代码
```vue
<template>
  <weui-date-picker
    v-model="pickerDate"
    placeholder="请选择内容"
  ></weui-date-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const pickerDate = ref(Date());
</script>
```
:::

### API
#### DatePicker Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | Date | Dayjs | - | 当前日期值 | - | 
| start  | Date \| number \| string \| Dayjs | 2000-1-1 | 开始日期 | - |
| end  | Date \| number \| string \| Dayjs | 2030-1-1 | 结束 | - |
| placeholder | string | - | 占位文案 | - |
| disabled | boolean | false | 是否禁用 | - |
| formatter | string |'YYYY-MM-DD' | 格式化字符串 | - |
| cron | string |'* * *' | cron 表达式，三位，分别是 dayOfMonth[1-31]，month[1-12] 和 dayOfWeek[0-6]（周日-周六） | - |
| container | string | 'body' | picker挂载节点 | - |

#### DatePicker Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 选择器选择值变更时回调 | ((val: Date \| Dayjs) => void) | - |
| selectChange  | 选择器选择值改变时回调 | ((val: Dayjs) => void) | - |
| change  | 选择器选择值确认时回调 | ((val: Dayjs) => void) | - |