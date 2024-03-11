# Preview 预览

Preview 主要用于表单数据的预览展示

基础使用

<weui-preview>
  <template #hd>
    <weui-preview-item label="付款金额" value="#24000.00"></weui-preview-item>
  </template>
  <weui-preview-item label="商品" value="打蛋机"></weui-preview-item>
  <weui-preview-item label="标题" value="这是一段文本"></weui-preview-item>
  <template #ft>
    <weui-preview-btn>操作</weui-preview-btn>
  </template>
</weui-preview>

::: details 显示代码
```vue
<weui-preview>
  <template #hd>
    <weui-preview-item label="付款金额" value="#24000.00"></weui-preview-item>
  </template>
  <weui-preview-item label="商品" value="打蛋机"></weui-preview-item>
  <weui-preview-item label="标题" value="这是一段文本"></weui-preview-item>
  <template #ft>
    <weui-preview-btn>操作</weui-preview-btn>
  </template>
</weui-preview>
```
:::

### API
#### Preview Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 面板主体区域 | - |
| hd  | - | 面板头部区域 | - |
| ft  | - | 面板尾部区域 | - |

#### PreviewItem Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| label  | string | - | 显示label值 | - | 
| value  | string | - | 显示的value值 | - |

#### PreviewItem Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| label  | - | 自定义label内容 | - |
| value  | - | 自定义value内容 | - |

#### PreviewBtn Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| type  | 'primary' \| 'default' | 'default' | 操作按钮类型 | - |

#### PreviewBtn Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 按钮内容 | - |

#### PreviewBtn Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| click  | 设置按钮点击事件 | (event: MouseEvent) => void | - |