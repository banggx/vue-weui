# Input 输入框

Input 输入框常用语文本内容输入

### 基础使用

<weui-input placeholder="输入内容"></weui-input>

::: details 显示代码
```vue
<weui-input placeholder="输入内容"></weui-input>
```
:::

### 清空输入框

<weui-input placeholder="输入内容" allow-clear></weui-input>

::: details 显示代码
```vue
<weui-input placeholder="输入内容" allow-clear></weui-input>
```
:::

### API
#### Input Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| type  | 'text' \| 'password' \| 'url' \| 'tel' | 'text' | 输入框类型 | - | 
| modelValue  | string | - | 输入框值 | - |
| placeholder | string | - | 输入框占位文案 | - |
| allowClear | boolean | false | 清空输入框 | - |
| disabled | boolean | false | 输入框禁用 | - |


#### Input Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 输入框内容改变时触发 | (val: string) => void | - |
| change  | 输入框内容改变时触发 | (val: string) => void | - |
