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

<style lang="less">
.weui-uploader__files {
  list-style: none !important;
  padding-left: 0 !important;
  
  > li {
    margin-top: 0 !important;
  }
}
</style>