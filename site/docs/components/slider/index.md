# 滑块 Slider

滑块一般用于控制数字调整

### 基础用法
<weui-slider :modelValue="val">默认按钮</weui-slider>

::: details 显示代码
```vue
<template>
  <weui-slider v-model="val">默认按钮</weui-slider>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const val = ref(50);
</script>
```
:::

### 滑块步长
通过 step 属性可以控制 slider 滑块每次滑动的步长

<weui-slider :modelValue="50" :step="10">默认按钮</weui-slider>

::: details 显示代码
```vue
<weui-slider :modelValue="50" :step="10">默认按钮</weui-slider>
```
:::

### 显示滑块数值
通过 showNum 属性可以控制 slider 滑块显示当前的数值

<weui-slider :modelValue="50" show-num>默认按钮</weui-slider>

::: details 显示代码
```vue
<weui-slider :modelValue="50" show-num>默认按钮</weui-slider>
```
:::

### API
#### Button Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | number | 0 | 当前滑块的值 | - | 
| step  | number | 1 | 滑块滑动的步长 | - |
| showNum | boolean | false | 是否显示滑块数值 | - |

#### Button Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| change  | 滑块滑动时触发 | (percent: number) => void | - |
| update:modelValue | 滑块滑动时改变 modelValue 值 | (percent: number) => void | -  |