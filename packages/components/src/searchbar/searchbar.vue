<template>
  <div class="weui-search-bar" id="searchBar">
    <form
      id="searchForm"
      role="combobox"
      aria-haspopup="true"
      aria-expanded="false"
      aria-owns="searchResult"
      class="weui-search-bar__form"
    >
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input
          :value="value"
          type="search"
          aria-controls="searchResult"
          class="weui-search-bar__input"
          id="searchInput"
          placeholder="搜索"
          @input="setValue"
        />
        <a
          href="javascript:"
          role="button"
          title="清除"
          class="weui-icon-clear"
          id="searchClear"
          wah-hotarea="click"
          @click="clearValue"
        ></a>
      </div>
      <label
        for="searchInput"
        class="weui-search-bar__label"
        id="searchText"
        wah-hotarea="click"
        style="transform-origin: 0px 0px; opacity: 1; transform: scale(1, 1)"
      >
        <i class="weui-icon-search"></i>
        <span aria-hidden="true" @click="emitSearch">搜索</span>
      </label>
    </form>
    <a
      href="javascript:"
      role="button"
      class="weui-search-bar__cancel-btn"
      id="searchCancel"
      wah-hotarea="click"
      >取消</a
    >
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import weui from 'weui.js';
import { useVModel } from '@vueuse/core';

defineOptions({
  name: 'weui-searchbar'
});
const props = withDefaults(
  defineProps<{
    modelValue: string;
  }>(),
  {}
);
const emit = defineEmits<{
  (type: 'update:modelValue', val: string): void;
  (type: 'search', val: string): void;
  (type: 'change', val: string): void;
}>();
const value = useVModel(props, 'modelValue', emit);

const setValue = (ev: Event) => {
  value.value = (ev.target as HTMLInputElement).value;
  emit('change', value.value);
};
const clearValue = () => {
  value.value = '';
};
const emitSearch = () => {
  emit('search', value.value);
};
onMounted(() => {
  weui.searchBar('#searchBar');
});
</script>
