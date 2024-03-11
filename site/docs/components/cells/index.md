# Cells 列表

Cells组件常用于列表展示

### 基础使用

<weui-cells title="cells标题">
  <weui-cell arrow>这是一段文本</weui-cell>
  <weui-cell arrow>这是一段文本</weui-cell>
</weui-cells>

::: details 显示代码
```vue
<weui-cells title="cells标题">
  <weui-cell arrow>这是一段文本</weui-cell>
  <weui-cell arrow>这是一段文本</weui-cell>
</weui-cells>
```
:::

### 自定义开始位置内容

weui-cell 提供了 hd 插槽可以自定义开始位置内容

<weui-cells title="cells标题">
  <weui-cell arrow>
    <template #hd>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width: 20px; margin-right: 16px; display: block;">
    </template>
    这是一段文本
  </weui-cell>
  <weui-cell arrow>
    <template #hd>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width: 20px; margin-right: 16px; display: block;">
    </template>
    这是一段文本
  </weui-cell>
</weui-cells>

::: details 显示代码
```vue
<weui-cells title="cells标题">
  <weui-cell arrow>
    <template #hd>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width: 20px; margin-right: 16px; display: block;">
    </template>
    这是一段文本
  </weui-cell>
  <weui-cell arrow>
    <template #hd>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAuCAMAAABgZ9sFAAAAVFBMVEXx8fHMzMzr6+vn5+fv7+/t7e3d3d2+vr7W1tbHx8eysrKdnZ3p6enk5OTR0dG7u7u3t7ejo6PY2Njh4eHf39/T09PExMSvr6+goKCqqqqnp6e4uLgcLY/OAAAAnklEQVRIx+3RSRLDIAxE0QYhAbGZPNu5/z0zrXHiqiz5W72FqhqtVuuXAl3iOV7iPV/iSsAqZa9BS7YOmMXnNNX4TWGxRMn3R6SxRNgy0bzXOW8EBO8SAClsPdB3psqlvG+Lw7ONXg/pTld52BjgSSkA3PV2OOemjIDcZQWgVvONw60q7sIpR38EnHPSMDQ4MjDjLPozhAkGrVbr/z0ANjAF4AcbXmYAAAAASUVORK5CYII=" alt="" style="width: 20px; margin-right: 16px; display: block;">
    </template>
    这是一段文本
  </weui-cell>
</weui-cells>
```
:::

### 自定义尾部内容

weui-cell 提供了 ft 插槽可以自定义尾部位置内容

<weui-cells title="cells标题">
  <weui-cell arrow>
    <template #ft>结束文本</template>
    这是一段文本
  </weui-cell>
  <weui-cell arrow>
    <template #ft>结束文本</template>
    这是一段文本
  </weui-cell>
</weui-cells>

::: details 显示代码
```vue
<weui-cells title="cells标题">
  <weui-cell arrow>
    <template #ft>结束文本</template>
    这是一段文本
  </weui-cell>
  <weui-cell arrow>
    <template #ft>结束文本</template>
    这是一段文本
  </weui-cell>
</weui-cells>
```
:::

### API
#### Cells Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| title  | string | - | 标题文本 | - | 

#### Cells Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 列表区域插槽 | - |

#### Cell Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| arrow  | boolean | false | 是否显示尾部arrow箭头 | - | 
| link  | boolean | false | link模式 | - | 

#### Cell Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 列表元素主要内容 | - |
| hd  | - | 列表元素首部内容 | - |
| ft  | - | 列表元素尾部内容 | - |