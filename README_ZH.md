中文版 | [English](./README.md)

<div align=center>
<img src=https://raw.githubusercontent.com/bangtz/vue-weui/main/vue-weui.png height=240px />
</div>

# vue-weui

[![](https://shields.io/github/package-json/v/bangtz/vue-weui/master/packages/vue-weui)](https://github.com/bangtz/vue-weui/tree/master/packages/vue-weui)
[![](https://pkg-size.dev/badge/bundle/68018)](https://pkg-size.dev/vue-weui-next)
[![codecov](https://codecov.io/gh/bangtz/vue-weui/graph/badge.svg?token=6TNVSF7OYT)](https://codecov.io/gh/bangtz/vue-weui)
[![](https://img.shields.io/badge/language-vue-orange.svg)](https://vuejs.org/)
![](https://img.shields.io/npm/l/vue-weui-next.svg)

基于 Vue3 开发实现的 WeUI 风格UI组件库。

## 快速开始

在开始使用之前，需要在html文件中引入weui样式文件。([WeUI](https://github.com/Tencent/weui))

```html
<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.3.0/weui.min.css"/>
```

安装组件包

```bash
npm install vue-weui-next

# or

yarn install vue-weui-next
```

完整引入

```ts
import { createApp } from 'vue';
import App from './App.vue';
import Weui from 'vue-weui-next';

const app = createApp(App);
app.use(Weui);
app.mount('#app');
```

手动引入

```html
<template>
  <Button>button</Button>
</template>
<script>
  import { Button } from 'vue-weui-next'
  export default {
    components: { Button },
  }
</script>
```

## 联系

当前完善了weui基础组件内容，后续将持续更新完善weui form表单相关的组件，如果对此项目感兴趣，欢迎一起贡献。

如果您发现任何代码问题，请随时提交问题。作者会及时更新和修复。谢谢

> ![](https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon16_wx_logo.png) *bangtz* (Add please note vue-weui)

# License

[Apache License 2.0](LICENSE)