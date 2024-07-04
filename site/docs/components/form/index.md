# Form 表单

form表单组件用于处理用户编辑表单。

### 基础使用

<weui-form>
  <weui-form-item label="姓名" name="name">
    <weui-input placeholder="请输入姓名" />
  </weui-form-item>
  <weui-form-item label="age" name="age">
    <weui-input placeholder="请输入年龄" />
  </weui-form-item>
</weui-form>

::: details 显示代码
```vue
<weui-form>
  <weui-form-item label="姓名" name="name">
    <weui-input placeholder="请输入姓名" />
  </weui-form-item>
  <weui-form-item label="age" name="age">
    <weui-input placeholder="请输入年龄" />
  </weui-form-item>
</weui-form>
```
:::

### 设置表单标题和描述

<weui-form title="表单标题" desc="表单描述">
  <weui-form-item label="姓名" name="name">
    <weui-input placeholder="请输入姓名" />
  </weui-form-item>
  <weui-form-item label="age" name="age">
    <weui-input placeholder="请输入年龄" />
  </weui-form-item>
</weui-form>

::: details 显示代码
```vue
<weui-form title="表单标题" desc="表单描述">
  <weui-form-item label="姓名" name="name">
    <weui-input placeholder="请输入姓名" />
  </weui-form-item>
  <weui-form-item label="age" name="age">
    <weui-input placeholder="请输入年龄" />
  </weui-form-item>
</weui-form>
```
:::


### 表单校验

<custom-validate-form />

::: details 显示代码
```vue
<template>
  <weui-form ref="formRef" :model="value" :rules="rules">
    <weui-form-item label="姓名" name="name">
      <weui-input v-model="value.name" placeholder="请输入姓名" />
    </weui-form-item>
    <weui-form-item label="age" name="age">
      <weui-input v-model="value.age" placeholder="请输入年龄" />
    </weui-form-item>
    <weui-button type="primary" @click="submitForm">提交</weui-button>
  </weui-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from 'vue-weui-next';

const formRef = ref<FormInstance>();
const value = ref({
  name: '',
  age: ''
});
const rules = {
  name: {
    type: 'string',
    message: '名称为字符串'
  },
  age: [
    {
      required: true,
      message: '年龄必填'
    }
  ]
};
const submitForm = () => {
  formRef.value?.validate().then(res => {
    console.log(res);
  });
}
</script>
```
:::


### 表单分组

<weui-form>
  <weui-form-group title="分组标题">
    <weui-form-item label="姓名" name="name">
      <weui-input placeholder="请输入姓名" />
    </weui-form-item>
    <weui-form-item label="age" name="age">
      <weui-input placeholder="请输入年龄" />
    </weui-form-item>
  </weui-form-group>
</weui-form>

::: details 显示代码
```vue
<weui-form>
  <weui-form-group title="分组标题">
    <weui-form-item label="姓名" name="name">
      <weui-input placeholder="请输入姓名" />
    </weui-form-item>
    <weui-form-item label="age" name="age">
      <weui-input placeholder="请输入年龄" />
    </weui-form-item>
  </weui-form-group>
</weui-form>
```
:::

### API
#### Form Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| title  | string ｜ - | 表单标题 | - | 
| desc  | string | - | 表单描述 | - |
| model | Record<string, any> | - | 表单数据，用于表单校验 | - |
| rules | Rules | - | 表单校验规则 | - |
| validateToAlert | boolean | false | 在校验失败时弹出alert提示 | - |
| validateAlert | string | (errors: ValidateError[]) => string | - | alert提示内容 | - |
| validateShowWarn | boolean | false | 在校验失败时显示表单警告提示 | - |


#### Form Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| title  | - | 自定义表单标题 | - |
| desc  | - | 自定义表单描述 | - |
| default  | - | 表单内容 | - |
| ft  | - | 表单底部区域内容 | - |


#### Form APIS
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| validate  | 执行表单校验 | (nameList?: string[]) => Promise\<Values\> | - |
| resetFields  | 重置表单值和校验错误信息 | (nameList?: string[]) => void | - |
| clearValidate  | 清除表单校验错误信息 | (nameList?: string[]) => void | - |

#### FormGroup Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| title  | string | - | 分组标题 | - | 

#### FormGroup Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| title  | - | 自定义分组标题 | - |
| default  | - | 分组表单内容 | - |

#### FormItem Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| name  | string | - | 字段名称 | - |
| label  | string | - | 字段描述 | - | 
| rule  | Rule | - | 字段校验规则 | - | 
| vertical | boolean | false | 是否垂直排列 | - | 

#### FormItem Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| default  | - | 表单元素内容 | - |

