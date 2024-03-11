# Alert 提示条

Alert 信息提示条主要用于状态信息提示。

### 基础使用

<custom-alert />

::: details 显示代码
```vue
<template>
  <weui-button @click="visible = true">打开Alert</weui-button>
  <weui-alert
    v-model="visible"
    type="warn-primary"
    text="测试测试测试"
  ></weui-alert>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
</script>
```
:::

### API
#### Alert Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | boolean | false | 是否显示 | - |
| type  | 'warn-primary' \| 'warn' \| 'default' \| 'tips-primary' \| 'tips' | 'default' | 提示类型 | - | 
| text | string | - | 提示的文本 | - |
| showClose | boolean | true | 是否显示关闭按钮 | - |
| showIcon | boolean | true | 是否显示icon | - |


#### Alert Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 自定义文本内容 | - |
| icon  | - | 自定义icon | - |
| extra  | - | 自定义尾部区域 | - |

#### Alert Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 信息条状态改变回调 | (val: boolean) => void | - |
| close  | 信息条关闭时回调 | () => void | - |

#### Alert API
|  名称   | 描述  | 参数 | 返回值 | 版本 |
|  ----  | ----  | ----- | ---- | ---- |
| alert  | 通过函数的方式调起alert展示 | AlertOptions | closeAlertFn | - |