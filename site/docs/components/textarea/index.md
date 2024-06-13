# Textarea 文本域

Textarea 组件常用于多行文本输入

### 基础使用

<weui-textarea placeholder="输入内容"></weui-textarea>

::: details 显示代码
```vue
<weui-extarea placeholder="输入内容"></weui-textarea>
```
:::

### 显示数据数量

<weui-textarea placeholder="输入内容" maxlength="10" show-num></weui-textarea>

::: details 显示代码
```vue
<weui-textarea placeholder="输入内容" maxlength="10" show-num></weui-textarea>
```
:::

### API
#### Textarea Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | string | - | 文本域值 | - |
| placeholder | string | - | 文本域占位文案 | - |
| maxlength | number | - | 文本域最大输入长度 | - |
| show-num | boolean | false | 是否显示输入字数 | - |
| disabled | boolean | false | 文本域禁用 | - |


#### Textarea Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 文本内容改变时触发 | (val: string) => void | - |
| change  | 文本域内容改变时触发 | (val: string) => void | - |
