# Toast 提示

Toast 常用于一些成功或失败的提示。

### Toast 类型
weui toast提示包括以下几种类型: success, warn, text，loading

<custom-toast></custom-toast>

::: details 显示代码
```vue
<template>
  <weui-button @click="visibleToast('success')">success</weui-button>
  <weui-button @click="visibleToast('warn')">warn</weui-button>
  <weui-button @click="visibleToast('text')">text</weui-button>
  <weui-button @click="visibleToast('loading')">loading</weui-button>
  <weui-toast v-model="visible" :type="type" text="提示文本"></weui-toast>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const type = ref('');

const visibleToast = (val: 'success' | 'warn' | 'loading' | 'text') => {
  type.value = val;
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 1500)
};
</script>
```
:::

### API
#### Toast Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| type  | 'success' \| 'warn' \| 'loading' | 'text' | toast提示类型 | - | 
| text  | string | - | 提示文本 | - |
| long | boolean | false | 是否长文本 | - |
| modelValue | boolean | false | 是否显示toast | - |

#### Toast Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | toast状态改变时触发 | (event: MouseEvent, val: boolean) => void | - |

#### Toast API
|  名称   | 描述  | 参数 | 返回值 | 版本 |
|  ----  | ----  | ----- | ---- | ---- |
| toast  | 通过函数的方式调起toast展示 | ToastOptions | 关闭toast的函数 | - |