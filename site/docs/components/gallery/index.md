# Gallery 画廊

Gallery 组件主要用于图片预览展示

### 基础使用

<custom-gallery />

::: details 显示代码
```vue
<template>
  <weui-button @click="visible = !visible">打开画廊</weui-button>
  <weui-gallery
    :visible="visible"
    :initial-index="current"
    :urls="images"
    @close="visible = false"
  ></weui-gallery>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const images = ref([
  `https://picsum.photos/300/200?uid=${Math.random()}`,
  `https://picsum.photos/300/200?uid=${Math.random()}`
]);
const current = ref(1);
</script>
```
:::

### API
#### Gallery Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| urls  | string[] | - | 预览的图片列表 | - | 
| initialIndex  | number | 0 | 初始化显示的图片索引 | - |
| visible  | boolean | false | 是否显示 | - |

#### Gallery Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| item  | \{ item: string, index: number \} | 自定义图片渲染 | - |

#### Gallery Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| change  | 更新图片索引时触发 | (index: number) => void | - |
| delete  | 点击底部删除按钮时触发 | (index: number, url: string) => void | - |
| close  | 点击关闭按钮时触发 | () => void | - |

#### Gallery API
|  名称   | 描述  | 参数 | 返回值 | 版本 |
|  ----  | ----  | ----- | ---- | ---- |
| gallery  | 通过函数的方式打开画廊 | GalleryOptions | 关闭gallery的函数 | - |
| updateIndex  | 存在于gallery组件实例上，用于更新当前索引的函数 | number | - | - |