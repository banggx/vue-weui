<script setup>
import { ref, onMounted } from 'vue'
import { createApp } from 'whyframe:app'

const el = ref()

onMounted(() => {
  createApp(el.value)
})
</script>

<template>
  <div ref="el"></div>
</template>