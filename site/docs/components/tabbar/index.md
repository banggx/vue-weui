# Tabbar 底部导航

TabBar 主要用于底部tab栏显示.

### 基础使用

<custom-tabbar />

::: details 显示代码
```vue
<template>
  <weui-tabbar v-model="navBar">
    <weui-tabbar-item
      v-for="tab in navBars"
      :key="tab.value"
      :label="tab.label"
      :value="tab.value"
      :icon="tab.icon"
    >
      {{ tab.label }} ---- Tab
    </weui-tabbar-item>
  </weui-tabbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const navBar = ref('menu1');
const navBars = [
  { label: '菜单1', value: 'menu1', icon: 'https://weui.io/images/icon_tabbar.png' },
  { label: '菜单2', value: 'menu2', icon: 'https://weui.io/images/icon_tabbar.png' }
];
</script>
```
:::

### API
#### Tabbar Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | any | - | 当前选择的tab | - | 

#### Tabbar Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 每个Tab的内容 | - |

#### Tabbar Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 当前选择的tab改变 | (val: any) => void | - |
| change  | 当前选择的tab改变 | (val: any) => void | - |

#### TabbarItem Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| label  | string | - | tab栏标题 | - | 
| value  | any | - | tab栏的值 | - |
| icon  | string | - | tab栏显示的icon | - |


#### TabbarItem Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 当前Tab的内容 | - |