<template>
  <div id="p1" class="weui-form-preview__item">
    <label class="weui-form-preview__label">
      <slot v-if="$slots['label']" name="label"></slot>
      <template v-else>{{ label }}</template>
    </label>
    <span class="weui-form-preview__value">
      <slot v-if="$slots['value']" name="value"></slot>
      <template v-else>{{ value }}</template>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-preview-item'
});

withDefaults(
  defineProps<{
    label?: string;
    value?: string;
  }>(),
  {
    label: '',
    value: ''
  }
);
</script>
