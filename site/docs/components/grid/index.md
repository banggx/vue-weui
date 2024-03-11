# Grids 九宫格

Grids 用于显示九宫格菜单

### 基础使用

Grids 结合 Grid 组件可以快速实现九宫格菜单效果
<weui-grids>
  <weui-grid
    icon="https://weui.io//images/icon_tabbar.png"
    label="Grid"
  ></weui-grid>
  <weui-grid
    icon="https://weui.io//images/icon_tabbar.png"
    label="Grid"
  ></weui-grid>
  <weui-grid
    icon="https://weui.io//images/icon_tabbar.png"
    label="Grid"
  ></weui-grid>
</weui-grids>

::: details 显示代码
```vue
<weui-grids>
  <weui-grid
    icon="https://weui.io//images/icon_tabbar.png"
    label="Grid"
  ></weui-grid>
  <weui-grid
    icon="https://weui.io//images/icon_tabbar.png"
    label="Grid"
  ></weui-grid>
  <weui-grid
    icon="https://weui.io//images/icon_tabbar.png"
    label="Grid"
  ></weui-grid>
</weui-grids>
```
:::

### API
#### Grids Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | Grid元素插槽 | - |

#### GridItem Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| icon  | string | - | Grid显示的Icon链接 | - | 
| label  | string | - | Grid显示的文本内容 | - |

#### GridItem Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| icon  | - | 自定义Grid Icon内容 | - |
| label  | - | 自定义Grid label内容 | - |

#### GridItem Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| click  | 点击Grid项的回调 | (event: MouseEvent) => void | - |