# NavBar 顶部导航

NavBar 主要用于顶部tab栏显示.

### 基础使用

<custom-navbar />

::: details 显示代码
```vue
<template>
  <weui-nav-bar v-model="navBar">
    <weui-nav-bar-item
      v-for="nav in navBars"
      :key="nav.value"
      :title="nav.label"
      :value="nav.value"
    >
      {{ nav.label }}
    </weui-nav-bar-item>
  </weui-nav-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const navBar = ref('menu1');
const navBars = [
  { label: '菜单1', value: 'menu1' },
  { label: '菜单2', value: 'menu2' }
];
</script>
```
:::

### API
#### NavBar Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | any | - | 当前选择的tab | - | 

#### NavBar Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 每个Tab的内容 | - |

#### NavBar Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 当前选择的tab改变 | (val: any) => void | - |
| change  | 当前选择的tab改变 | (val: any) => void | - |

#### NavBarItem Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| label  | string | - | tab栏标题 | - | 
| value  | any | - | tab栏的值 | - | 

#### NavBarItem Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 当前Tab的内容 | - |