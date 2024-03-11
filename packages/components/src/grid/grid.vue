<template>
  <a
    href="javascript:"
    class="weui-grid"
    role="button"
    @click.prevent="(ev) => $emit('click', ev)"
  >
    <div class="weui-grid__icon">
      <slot v-if="$slots['icon']" name="icon"></slot>
      <img v-else :src="icon" alt="" />
    </div>
    <p class="weui-grid__label">
      <slot v-if="$slots['label']" name="label"></slot>
      <template v-else>{{ label }}</template>
    </p>
  </a>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-grid'
});
withDefaults(
  defineProps<{
    icon?: string;
    label?: string;
  }>(),
  {
    icon: '',
    label: ''
  }
);
defineEmits<{
  (type: 'click', ev: MouseEvent): void;
}>();
</script>
