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