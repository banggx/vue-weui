# actionSheet 菜单

actionsheet 弹出式菜单主要用于一些菜单操作.

### 基础使用

<custom-actionsheet />

::: details 显示代码
```vue
<template>
  <weui-button @click="visibleActionSheet = true">打开action-sheet</weui-button>
  <weui-action-sheet
    v-model="visibleActionSheet"
    :menus="menus"
    title="这是标题"
    :actions="actions"
  ></weui-action-sheet>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visibleActionSheet = ref(false);
const menus = [
  { label: '菜单1', id: 1 },
  { label: '菜单2', id: 2 }
];
const actions = [{ label: '取消', key: 'cancel' }];
</script>
```
:::

### API
#### ActionSheet Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | boolean | false | 是否显示actionSheet | - | 
| title  | string | - | 标题内容 | - |
| menus | ActionSheetMenuOrActions[] | [] | 菜单列表 | - |
| actions | ActionSheetMenuOrActions[] | [] | 操作列表 | - |

#### ActionSheet Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| title  | - | 自定义标题区域 | - |
| menu  | menu: ActionSheetMenuOrActions | 自定义菜单项 | - |
| action  | action: ActionSheetMenuOrActions | 自定义操作项 | - |

#### ActionSheet Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| click  | 点击menu或者actions触发 | (item: ActionSheetMenuOrActions) => void | - |
| close  | 关闭actionsheet触发 | () => void | - |

#### ActionSheet API
|  名称   | 描述  | 参数 | 返回值 | 版本 |
|  ----  | ----  | ----- | ---- | ---- |
| actionSheet  | 通过函数的方式调起actionSheet展示 | ActionSheetOptions | closeActionSheetFn | - |