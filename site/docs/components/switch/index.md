# Switch 开关

Switch 开关用于表示两种状态之间的切换，多用于触发「开/关」。

### 基础使用

<weui-switch :model-value="true"></weui-switch>

::: details 显示代码
```vue
<weui-switch :model-value="true"></weui-switch>
```
:::


### API
#### Switch Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | boolean | - | 开关状态 | - |
| disabled | boolean | false | 开关禁用 | - |


#### Textarea Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 开关状态改变时触发 | (val: boolean) => void | - |
| change  | 开关状态改变时触发 | (val: boolean) => void | - |
