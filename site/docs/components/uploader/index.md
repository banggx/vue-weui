# Uploader 上传

Uploader组件主要实现文件上传功能

### 基础使用

<custom-uploader></custom-uploader>

::: details 显示代码
```vue
<template>
  <weui-uploader
    v-model="fileList"
    action="http://localhost:8080/upload"
    :multiple="true"
    :before-send="beforeSend"
    :custom-send="customSend"
  >
  </weui-uploader>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const fileList = ref([
  {
    id: '1',
    status: 'success',
    url: 'https://weui.io/images/pic_160.png'
  },
  {
    id: '2',
    status: 'progress',
    percent: 50,
    url: 'https://weui.io/images/pic_160.png'
  },
  {
    id: '3',
    status: 'fail',
    url: 'https://weui.io/images/pic_160.png'
  }
]);

const beforeSend = (file) => {
  console.log('beforeSend', file)
};

const customSend = async (file) => {
  return {
    url: 'test',
    status: 'success'
  }
}
</script>
```
:::

### API
#### Uploader Props
|  名称   | 类型  | 默认值 | 说明 | 版本 |
|  ----  | ----  | ----- | ---- | ----- |
| modelValue  | UploadItem[] | - | 已上传的文件列表 | - |
| action | string | - | 上传的服务器地址 | - |
| type | file \| base64 | file | 上传的文件形式 | - |
| name | string | file | 上传的文件名称 | - |
| accept | all \| media \| video \| image | - | 接收的文件类型 | - |
| multiple | boolean | false | 是否多选 | - |
| disabled | boolean | false | 是否禁用 | - |
| maxCount | number | - | 最大上传数量 | - |
| maxSize | number | - | 最大上传大小 | - |
| compress | { width: number, height: number, quality: number } \| false | \{ width: 1600, height: 1600, quality: 0.8 \} | 是否压缩(仅图片有效) | - |
| showFileList | boolean | - | 是否显示上传列表 | - |
| showFileList | boolean | true | 是否显示上传列表 | - |
| repeatUpload | boolean | true | 是否允许重复上传 | - |
| beforeUpload | (file: File, files: File[]) => Maybe\<boolean\>; | - | 文件上传时调用，返回false则不上传 | - |
| beforeSend | (file: UploadFile) => Maybe\<{ data?: PlainObject; headers?: PlainObject }\>; | - | 发送上传请求时调用，返回对象值可以扩展上传的data和headers | - |
| customSend | (file: UploadFile) => Promise\<UploadResult\>; | - | 自定义上传，需要返回Promise并带上上传结果 | - |
| convertResult | (result: PlainObject) => UploadResult; | - | 上传成功，转化服务器返回数据时调用，用于将不符合UploadResult规范的服务器返回数据转化为标准格式 | - |

#### Uploader Events
|  名称   | 描述  | 参数 | 版本 |
|  ----  | ----  | ----- | ---- |
| update:modelValue  | 文件上传时触发 | (val: UploadItem[]) => void | - |
| success  | 文件上传成功时触发 | (file: UploadFile, result: PlainObject) => void | - |
| error  | 文件上传失败时触发 | (file: UploadFile, error: Error) => void | - |
| progress  | 文件上传进度时触发 | (file: UploadFile, percent: number) => void | - |
| delete  | 文件点击删除时触发 | (file: UploadFile) => void | - |


#### Uploader Slots
|  名称   | 参数  | 说明 | 版本 |
|  ----  | ----  | ----- | ---- |
| item  | item: UploadItem | 自定义上传预览项 | - |
| uploadBtn  | - | 自定义上传按钮 | - |

#### UploadItem
|  名称   | 类型  | 说明 | 可选值 |
|  ----  | ----  | ----- | ---- |
| id | string | 文件ID | - |
| url | string | 文件地址 | - |
| thumb | string | 预览图 | 可选 |
| status | 'ready' \| 'progress' \| 'success' \| 'fail' | 上传状态 | - |
| type | 'image' \| 'video' \| 'file' | 文件类型 | - |
| percent | number | 上传进度 | 可选 |
| hash | string | 文件hash | 可选 |