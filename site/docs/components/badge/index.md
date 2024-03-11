# Badge 标记

Badge用于标识一些红点提示信息，如通知提醒等

### 基础用法

标记通过 value 可以定义标记显示的值

<weui-badge :value="20"></weui-badge>

::: details 显示代码
```vue
<weui-badge :value="20"></weui-badge>
```
:::

### 自定义标记显示内容

标记可通过 default 插槽自定义编辑内容

<weui-badge>
  <span>这是自定义文本</span>
</weui-badge>

::: details 显示代码
```vue
<weui-badge>
  <span>这是自定义文本</span>
</weui-badge>
```
:::

### 显示在元素右上角

标记可显示在指定内容的右上角

<weui-badge value="20">
  <template #content>
    <div class="item" style="width: 36px;height:36px;background:#efefef;border-radius:4px;"></div>
  </template>
</weui-badge>

::: details 显示代码
```vue
<weui-badge value="20">
  <template #content>
    <div class="item" style="width: 36px;height:36px;background:#efefef;border-radius:4px;"></div>
  </template>
</weui-badge>
```
:::

### 显示为点模式

标记可通过 dot 属性指定显示为一个小点

<weui-badge dot></weui-badge>

::: details 显示代码
```vue
<weui-badge dot></weui-badge>
```
:::

### 数值溢出显示

通过指定标记 max 值可以限制标记显示的最大值，超出时做溢出处理

<weui-badge :value="20" :max="19"></weui-badge>

::: details 显示代码
```vue
<weui-badge :value="20" :max="19"></weui-badge>
```
:::

### API
#### Badge Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| dot  | boolean | false | 标记是否显示为点 | - | 
| value  | string \| number | undefined | 标记显示的内容 | - |
| max | number | undefined | 标记显示的最大值，当 value 为 number 时有效 | - |

#### Badge Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 自定义标记内容 | - |
| content | - | 标记显示内容，标记将显示在该元素的右上角 | - |