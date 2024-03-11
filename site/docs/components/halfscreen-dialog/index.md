# HalfScreenDialog 半屏

HalfScreenDialog 主要用于半屏弹层展示。

### 基础使用

<custom-halfscreen-dialog />

::: details 显示代码
```vue
<template>
  <weui-button @click="visible = true">打开HalfScreen</weui-button>
  <weui-half-screen-dialog
    v-model="visible"
    icon-type="slide-down"
    title="测试"
    sub-title="副标题"
    @close="closeHandler"
  >
    HalfScreen
  </weui-half-screen-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const closeHandler = () => {
  console.log('close')
};
</script>
```
:::

### API
#### HalfScreenDialog Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | boolean | false | 是否打开半屏 | - | 
| showClose  | boolean | trye | 是否显示关闭按钮 | - |
| title | string | - | 标题内容 | - |
| subTitle | string | - | 副标题内容 | - |
| iconType | 'close' \| 'slide-down' | 'close' | 关闭按钮类型 | - |

#### HalfScreenDialog Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 半屏主题区域 | - |
| hd  | - | 自定义头部标题区域 | - |
| extra  | - | 自定义头部右上角 | - |
| ft  | - | 自定义底部区域 | - |

#### Button Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 半屏显示状态更新 | (val: boolean) => void | - |
| close  | 半屏关闭时触发 | () => void | - |