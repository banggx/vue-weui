# Msg 提示页

Msg 提示主要用于展示一些操作状态反馈页面。

### 基础使用

<weui-msg
  type="success"
  title="操作成功"
  desc="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现文字链接"
>
  <template #custom-area>自定义内容</template>
  <template #opr-area>
    <weui-button type="primary">推荐操作</weui-button>
  </template>
  <template #tips-area>
    提示详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现文字链接
  </template>
  <template #extra-area> 底部链接区域 </template>
</weui-msg>

::: details 显示代码
```vue
<weui-msg
  type="success"
  title="操作成功"
  desc="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现文字链接"
>
  <template #custom-area>自定义内容</template>
  <template #opr-area>
    <weui-button type="primary">推荐操作</weui-button>
  </template>
  <template #tips-area>
    提示详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现文字链接
  </template>
  <template #extra-area> 底部链接区域 </template>
</weui-msg>
```
:::

### API
#### Msg Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| type  | 'success' \| 'info' \| 'waiting' \| 'warn' | - | 提示页类型 | - | 
| title  | string | - | 标题文案 | - |
| desc | string | - | 描述文案 | - |


#### Button Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| icon-area  | - | 自定义icon图标区域 | - |
| title  | - | 自定义标题 | - |
| desc  | - | 自定义描述 | - |
| custom-area | - | 自定义内容区域，位于描述下方 | - |
| opr-area | - | 操作按钮区域 | - |
| tips-area | - | 提示内容区域，位于操作按钮下方 | - |
| extra-area | - | 尾部扩展区域，位于最下方 | - |
