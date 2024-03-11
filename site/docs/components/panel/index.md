# Panel 面板

Panel 面板用于展示一些图文组合数据

### 基础使用
<weui-panel>
  <template #hd>Panel title</template>
  <weui-media-box
    title="标题1"
    desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"
  ></weui-media-box>
  <weui-media-box
    title="标题2"
    desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"
  ></weui-media-box>
  <template #ft>
    <weui-cell link arrow>查看详情</weui-cell>
  </template>
</weui-panel>

::: details 显示代码
```vue
<weui-panel>
  <template #hd>Panel title</template>
  <weui-cells>
    <weui-cell arrow>这是一段文本</weui-cell>
    <weui-cell arrow>这是一段文本</weui-cell>
  </weui-cells>
  <template #ft>
    <weui-cell link arrow>查看详情</weui-cell>
  </template>
</weui-panel>
```
:::

### API
#### Panel Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 面板主体区域 | - |
| hd  | - | 面板头部区域 | - |
| ft  | - | 面板尾部区域 | - |