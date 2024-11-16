<template>
  <div
    v-show="visible"
    aria-labelledby="galleryImg"
    aria-hidden="false"
    aria-modal="true"
    class="weui-gallery weui-gallery__container"
    role="dialog"
  >
    <div class="weui-gallery__header">
      <div class="gallery-counter">
        {{ currentIndex + 1 }}/{{ urls.length }}
      </div>
      <div class="gallery-close__btn" @click="closeGallery">
        <i class="weui-icon-close" />
      </div>
    </div>
    <div
      class="weui-gallery__img-wrap"
      ref="containerRef"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
    >
      <template v-for="(item, index) in urls">
        <template v-if="$slots['item']">
          <slot name="item" :item="item" :index="index"></slot>
        </template>
        <div
          v-else
          :key="index"
          id="galleryImg"
          alt="图片详情"
          role="img"
          class="weui-gallery__img"
          tabindex="-1"
        >
          <img :src="item" alt="" />
        </div>
      </template>
    </div>
    <div class="weui-gallery__opr">
      <a
        role="button"
        aria-label="删除"
        href="javascript:"
        class="weui-gallery__del"
        @click="deleteGallery"
      >
        <i class="weui-icon-delete weui-icon_gallery-delete"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs, watchEffect } from 'vue';
import { useVModel } from '@vueuse/core';
import './gallery.less';

defineOptions({
  name: 'weui-gallery'
});
const props = withDefaults(
  defineProps<{
    urls: string[];
    modelValue?: number;
    visible?: boolean;
  }>(),
  {
    modelValue: 0,
    visible: false
  }
);
const emit = defineEmits<{
  (type: 'update:modelValue', value: number): void;
  (type: 'change', index: number): void;
  (type: 'delete', index, url: string): void;
  (type: 'close'): void;
}>();
const { visible, urls } = toRefs(props);
const currentIndex = useVModel(props, 'modelValue', emit);
const startX = ref(0);
const moveX = ref(0);
const containerRef = ref<HTMLElement | null>(null);

const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX;
  moveX.value = 0;
  if (containerRef.value) {
    containerRef.value.style.transition = 'none';
  }
};
const handleTouchMove = (e: TouchEvent) => {
  moveX.value = e.touches[0].clientX - startX.value;
  if (containerRef.value) {
    const translateX =
      -currentIndex.value * 100 + (moveX.value / window.innerWidth) * 100;
    containerRef.value.style.transform = `translateX(${translateX}%)`;
  }
};
const handleTouchEnd = () => {
  if (containerRef.value) {
    containerRef.value.style.transition = 'transform 0.3s';

    // 判断滑动距离是否超过屏幕宽度的 1/3
    const threshold = window.innerWidth / 3;

    let current = currentIndex.value;
    if (Math.abs(moveX.value) > threshold) {
      if (moveX.value > 0 && currentIndex.value > 0) {
        current--;
      } else if (moveX.value < 0 && current < props.urls.length - 1) {
        current++;
      }
    }
    if (current !== currentIndex.value) {
      currentIndex.value = current;
      emit('change', current);
    } else {
      // 没触发滚动，回弹
      containerRef.value.style.transform = `translateX(${-current * 100}%)`;
    }
  }
};
const closeGallery = () => {
  emit('close');
};
const deleteGallery = () => {
  const url = props.urls[currentIndex.value];
  emit('delete', currentIndex.value, url);
};

watchEffect(() => {
  if (!containerRef.value) return;
  containerRef.value.style.transform = `translateX(${
    -currentIndex.value * 100
  }%)`;
});
</script>
