# 选择器 Picker

选择器常用于选择一些已知选项。

### 基础使用

<custom-picker />

::: details 显示代码
```vue
<template>
  <weui-picker
    v-model="pickerData"
    :options="pickerOptions"
    placeholder="请选择内容"
  ></weui-picker>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const pickerData = ref(1);
const pickerOptions = [
  { label: 'label1', value: 1, disabled: true },
  { label: 'label2', value: 2 },
  { label: 'label3', value: 3 },
  { label: 'label4', value: 4 },
  { label: 'label5', value: 5 }
];
</script>
```
:::

### API
#### Picker Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | any | - | 选择器的值 | - | 
| options  | PickerItem\<T\>[] | PickerItem\<T\>[][]; | [] | 选择项 | - |
| disabled | boolean | false | 选择器是否禁用 | - |
| placeholder | string | - | 默认占位提示 | - |
| isMulti | boolean | - | 是否多列选择器 | - |
| delimiter | string | '/' | 多列选择值分割符 | - |
| confirmText | string | '确定' | 选择器确认按钮 | - |
| title | string | - | 选择器标题 | - |
| desc | string | - | 选择器描述 | - |
| container | string | 'body' | picker挂载节点 | - |

#### Picker Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 选择器选择值变更时回调 | ((val: T \| T[]) => void) | - |
| selectChange  | 选择器选择值改变时回调 | ((val: PickerItem\<T\>[] \| PickerItem\<T\>) => void) | - |
| change  | 选择器选择值确认时回调 | ((val: PickerItem\<T\>[] \| PickerItem\<T\>) => void) | - |
