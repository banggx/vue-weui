<template>
  <a
    aria-labelledby="js_p1m1_bd"
    href="javascript:"
    class="weui-media-box weui-media-box_appmsg"
  >
    <div v-if="$slots['hd']" aria-hidden="true" class="weui-media-box__hd">
      <slot name="hd"></slot>
    </div>
    <div aria-hidden="true" id="js_p1m1_bd" class="weui-media-box__bd">
      <slot v-if="$slots['default']"></slot>
      <template v-else>
        <strong class="weui-media-box__title">{{ title }}</strong>
        <p class="weui-media-box__desc">{{ desc }}</p>
      </template>
    </div>
  </a>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'weui-media-box'
});

withDefaults(
  defineProps<{
    title?: string;
    desc?: string;
  }>(),
  {
    title: '',
    desc: ''
  }
);
</script>
