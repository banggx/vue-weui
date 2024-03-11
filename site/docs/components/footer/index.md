# 页脚 Footer

页脚 Footer 用于显示页面底部信息

### 基础使用

<weui-footer>这是页脚文本</weui-footer>

::: details 显示代码
```vue
<weui-footer>这是页脚文本</weui-footer>
```
:::

### 带链接的页脚

footer的 links 插槽可以用于定义底部链接信息，可以结合 footer-link 组件完成链接定义

<weui-footer>
  这是页脚文本
  <template #links>
    <weui-footer-link link="">底部链接1</weui-footer-link>
    <weui-footer-link link="">底部链接2</weui-footer-link>
  </template>
</weui-footer>

::: details 显示代码
```vue
<weui-footer>
  这是页脚文本
  <template #links>
    <weui-footer-link link="">底部链接1</weui-footer-link>
    <weui-footer-link link="">底部链接2</weui-footer-link>
  </template>
</weui-footer>
```
:::


### API
#### Footer Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| text  | string | - | 底部文案 | - | 

#### Footer Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 自定义底部文案内容 | - |
| links | - | 自定义底部链接 | - |

#### FooterLink Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| link  | string | - | 跳转链接 | - |
| target  | '_blank' | - | 打开方式 | - |

#### FooterLink Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 自定义链接内容 | - |