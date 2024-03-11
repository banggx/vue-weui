# 进度 Progress

进度条一般用于文件上传进度显示。

### 基础使用

进度条组件可以通过 count 属性控制当前进度值

<weui-progress :count="50"></weui-progress>
::: details 显示代码
```vue
<weui-progress :count="50"></weui-progress>
```
:::

### 显示关闭按钮

进度条组件可以通过 show-close 属性控制关闭按钮显示

<weui-progress :count="50" show-close></weui-progress>
::: details 显示代码
```vue
<weui-progress :count="50" show-close></weui-progress>
```
:::

### 自定义进度条尾缀

进度条组件提供 extra 插槽，用于自定义组件尾缀

<weui-progress :count="50">
  <template #extra>
    <span>50%</span>
  </template>
</weui-progress>

::: details 显示代码
```vue
<weui-progress :count="50">
  <template #extra>
    <span>50%</span>
  </template>
</weui-progress>
```
:::


### API
#### Progress Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| count  | number | 0 | 进度条值 | - | 
| showClose  | boolean | false | 显示关闭按钮 | - |

#### Progess Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| extra  | - | 自定义进度条尾缀 | - |

#### Progress Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| close  | 点击关闭按钮回调 | (event: MouseEvent) => void | - |