# 按钮 Button

按钮用来触发一些操作。

### 按钮类型
weui 按钮有三种类型，default，primary，warn

<weui-button type="default">默认按钮</weui-button>
<weui-button type="primary">主要按钮</weui-button>
<weui-button type="warn">警告按钮</weui-button>

::: details 显示代码
```vue
<weui-button type="default">默认按钮</weui-button>
<weui-button type="primary">主要按钮</weui-button>
<weui-button type="warn">警告按钮</weui-button>
```
:::

### 按钮尺寸
weui 按钮有两种尺寸，medium，mini
<weui-button size="medium">medium按钮</weui-button>
<div style="text-align: center; margin-top: 12px;"><weui-button size="mini">mini按钮</weui-button></div>

::: details 显示代码
```vue
<weui-button size="medium">medium按钮</weui-button>
<weui-button size="mini">mini按钮</weui-button>
```
:::

### 按钮禁用
weui 按钮可以通过 disabled 控制禁用状态
<weui-button disabled>禁用按钮</weui-button>

::: details 显示代码
```vue
<weui-button disabled>禁用按钮</weui-button>
```
:::

### 按钮 loading
weui 按钮可以通过 loading 控制加载状态
<weui-button loading>加载按钮</weui-button>

::: details 显示代码
```vue
<weui-button loading>加载按钮</weui-button>
```
:::


### API
#### Button Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| type  | 'default' \| 'primary' \| 'warn' | 'default' | 按钮类型 | - | 
| size  | 'medium' \| 'mini' | - | 按钮尺寸 | - |
| disabled | boolean | false | 按钮是否禁用 | - |
| loading | boolean | false | 按钮是否加载中 | - |

#### Button Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 按钮的内容 | - |

#### Button Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| click  | 设置按钮点击事件 | (event: MouseEvent) => void | - |