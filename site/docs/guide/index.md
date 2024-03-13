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