<template>
  <div class="weui-panel weui-panel_access">
    <div v-if="$slots['hd']" class="weui-panel__hd">
      <slot name="hd"></slot>
    </div>
    <div class="weui-panel__bd">
      <slot></slot>
    </div>
    <div v-if="$slots['ft']" class="weui-panel__ft">
      <slot name="ft"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-panel'
});
</script>
