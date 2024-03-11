[中文版](./README_ZH.md) | English

<div align=center>
<img src=https://raw.githubusercontent.com/bangtz/vue-weui/main/vue-weui.png height=240px />
</div>

# vue-weui

Weui style UI component library developed and implemented based on Vue3.

## Quick start

Before starting to use it, you need to introduce the weui style file into the html file. ([WeUI](https://github.com/Tencent/weui))

```html
<link rel="stylesheet" href="https://res.wx.qq.com/open/libs/weui/2.3.0/weui.min.css"/>
```

Install component package.

```bash
npm install vue-weui-next

# or

yarn install vue-weui-next
```

Complete introduction.

```ts
import { createApp } from 'vue';
import App from './App.vue';
import Weui from 'vue-weui-next';

const app = createApp(App);
app.use(Weui);
app.mount('#app');
```

Manual import.

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

## Contact

Currently, the content of the basic components of weui has been improved. We will continue to update and improve the components related to the weui form form in the future. If you are interested in this project, you are welcome to contribute.

If you find any code problems, please feel free to submit an issue. The author will update and fix them in time. Thank you.

> ![](https://open.weixin.qq.com/zh_CN/htmledition/res/assets/res-design-download/icon16_wx_logo.png) *bangtz* (Add please note vue-weui)

# License

[Apache License 2.0](LICENSE)