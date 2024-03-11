<template>
  <div class="weui-form-preview">
    <div v-if="$slots['hd']" role="option" class="weui-form-preview__hd">
      <slot name="hd"></slot>
    </div>
    <div
      role="option"
      aria-labelledby="p1 js_a11y_comma p2 js_a11y_comma p3"
      class="weui-form-preview__bd"
    >
      <slot></slot>
    </div>
    <div v-if="$slots['ft']" class="weui-form-preview__ft">
      <slot name="ft"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-preview'
});
</script>
