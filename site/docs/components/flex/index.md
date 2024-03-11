# 布局 Flex

Flex 用于完成一些布局操作

### 基础使用

Flex 元素可以通过 gap 属性设置元素之间的间距

<weui-flex :gap="20">
  <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px;">weui-item</p>
  </weui-flex-item>
    <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
    <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
</weui-flex>

::: details 显示代码
```vue
<weui-flex :gap="20">
  <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px;">weui-item</p>
  </weui-flex-item>
    <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
    <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
</weui-flex>
```
:::

### 设置 Flex 元素占比

通过 FlexItem 的 flex 属性可以设置元素的占比

<weui-flex :gap="20">
  <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px;">weui-item</p>
  </weui-flex-item>
    <weui-flex-item :flex="2">
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
    <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
</weui-flex>

::: details 显示代码
```vue
<weui-flex :gap="20">
  <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px;">weui-item</p>
  </weui-flex-item>
    <weui-flex-item :flex="2">
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
    <weui-flex-item>
    <p style="background:#efefef;text-align:center;line-height:32px">weui-item</p>
  </weui-flex-item>
</weui-flex>
```
:::

### API
#### Flex Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| gap  | number \| [number, number] | 0 | 设置元素间的间距，当为number时，横纵间距相同，当为[number, number]时，分别表示横向间距，纵向间距 | - | 

#### Flex Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | Flex布局的子元素(FlexItem) | - |


#### FlexItem Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| flex  | number | 1 | 当前 flex 元素的占比 | - |

#### FlexItem Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | Flex布局的内容 | - |