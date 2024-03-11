# Steps 步骤条

Steps 步骤条常用于展示分步进行场景。

### 基础使用

Steps 结合 StepItem 组件可以快速完成步骤条渲染
<weui-steps v-model="activeStep">
  <weui-step-item :step="0" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="1" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="2" title="标题" desc="描述"></weui-step-item>
</weui-steps>

::: details 显示代码
```vue
<template>
  <weui-steps v-model="activeStep">
    <weui-step-item :step="0" title="标题" desc="描述"></weui-step-item>
    <weui-step-item :step="1" title="标题" desc="描述"></weui-step-item>
    <weui-step-item :step="2" title="标题" desc="描述"></weui-step-item>
  </weui-steps>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const activeStep = ref(0);
</script>
```
:::

### 显示icon的步骤条

stepItem 组件通过指定 icon 属性可以让步骤显示icon，目前仅包含 waiting 和 success

<weui-steps v-model="activeStep">
  <weui-step-item :step="0" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="1" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="2" title="标题" desc="描述" icon="waiting"></weui-step-item>
</weui-steps>

::: details 显示代码
```vue
<weui-steps v-model="activeStep">
  <weui-step-item :step="0" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="1" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="2" title="标题" desc="描述" icon="waiting"></weui-step-item>
</weui-steps>
```
:::

### 横向步骤条

通过 direction 属性可以指定步骤条方向，包括 horizontal 和 vertical

<weui-steps v-model="activeStep" direction="horizontal">
  <weui-step-item :step="0" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="1" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="2" title="标题" desc="描述" icon="waiting"></weui-step-item>
</weui-steps>

::: details 显示代码
```vue
<weui-steps v-model="activeStep" direction="horizontal">
  <weui-step-item :step="0" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="1" title="标题" desc="描述"></weui-step-item>
  <weui-step-item :step="2" title="标题" desc="描述" icon="waiting"></weui-step-item>
</weui-steps>
```
:::

### API
#### Steps Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | number | 0 | 当前步骤 | - | 
| direction  | 'vertical' \| 'horizontal' | vertical | 步骤方向 | - |

#### Steps Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| change  | 步骤值改变时触发 | (percent: number) => void | - |
| update:modelValue | 步骤值改变时触发 | (step: number) => void | -  |

#### StepItem Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| step  | number | 0 | 步骤值 | - | 
| title  | string | '' | 标题文本，仅在 vertical 下显示 | - |
| desc  | string | '' | 描述文本，仅在 vertical 下显示 | - |
| icon  | 'waiting' \| 'success' | - | icon内容 | - |

#### StepItem Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| title  | - | 自定义标题内容 | - |
| desc  | - | 自定义描述内容 | - |
