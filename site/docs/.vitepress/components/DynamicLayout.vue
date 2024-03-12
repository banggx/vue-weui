<script setup>
import { useRoute } from 'vitepress'
import Theme from 'vitepress/theme'
import FrameDefaultLayout from './FrameDefaultLayout.vue'

const route = useRoute()
</script>

<template>
  <FrameDefaultLayout v-if="route.path.startsWith('/frames/default')" />
  <Theme.Layout v-else />
</template>