<template>
  <weui-button @click="visibleToast('success')">success</weui-button>
  <weui-button @click="visibleToast('warn')">warn</weui-button>
  <weui-button @click="visibleToast('text')">text</weui-button>
  <weui-button @click="visibleToast('loading')">loading</weui-button>
  <weui-toast v-model="visible" :type="type" text="提示文本"></weui-toast>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);
const type = ref('');

const visibleToast = (val: 'success' | 'warn' | 'loading' | 'text') => {
  type.value = val;
  visible.value = true;

  setTimeout(() => {
    visible.value = false;
  }, 1500)
};
</script>