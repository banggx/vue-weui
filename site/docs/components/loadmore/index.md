# 加载中 Loadmore

Loadmore 常用于一些滚动加载的场景

### 加载中类型

loadmore 有三种展示类型，分别是 default，line，dot

<weui-loadmore></weui-loadmore>
<weui-loadmore type="line"></weui-loadmore>
<weui-loadmore type="dot"></weui-loadmore>

::: details 显示代码
```vue
<weui-loadmore></weui-loadmore>
<weui-loadmore type="line"></weui-loadmore>
<weui-loadmore type="dot"></weui-loadmore>
```
:::

### 自动义加载文案

loadmore 提供插槽可以自定义加载中文案内容

<weui-loadmore>
  <a href="#">加载中，超链接</a>
</weui-loadmore>

::: details 显示代码
```vue
<weui-loadmore>
  <a href="#">加载中，超链接</a>
</weui-loadmore>
```
:::

### API
#### Loadmore Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| type  | 'default' \| 'line' \| 'dot' | 'default' | 加载中类型 | - | 
| text  | string | '正在加载' | 加载中文本 | - |


#### Loadmore Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 自定义加载中文本 | - |