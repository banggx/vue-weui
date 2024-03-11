# Dialog 对话框

Dialog 对话框主要用于一些交互式提示。

### 基础使用

<custom-dialog />

::: details 显示代码
```vue
<template>
  <weui-button @click="visible = true">打开dialog</weui-button>
  <weui-dialog
    v-model="visible"
    title="这是标题"
    desc="描述"
    @cancel="cancelHandler"
    @ok="okHandler"
  ></weui-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const cancelHandler = () => {
  console.log('cancel')
};
const okHandler = () => {
  console.log('ok')
};
</script>
```
:::

### API
#### Dialog Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | boolean | false | 是否显示dialog | - | 
| title  | string | - | 标题内容 | - |
| desc | string | - | 描述内容 | - |
| cancelText | string \| null | '取消' | 取消按钮文本，当传null时不显示 | - |
| okText | string \| null | '确认' | 确认按钮文本，当传null时不显示 | - |

#### Dialog Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| hd  | - | 自定义头部区域 | - |
| default  | - | 自定义主体区域 | - |
| ft  | - | 自定义底部区域 | - |

#### Dialog Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| cancel  | 点击取消按钮触发 | () => void | - |
| ok  | 点击确认按钮触发 | () => void | - |

#### Dialog API
|  名称   | 描述  | 参数 | 返回值 | 版本 |
|  ----  | ----  | ----- | ---- | ---- |
| dialog  | 通过函数的方式调起dialog展示 | DialogOptions | closeDialogFn | - |