<template>
  <weui-icon type="waiting" size="20px"></weui-icon>
  <weui-button type="warn" loading>按钮</weui-button>
  <weui-slider v-model="sliderVal" :step="10"></weui-slider>
  <weui-loading type="primary"></weui-loading>
  <weui-progress :count="50">
    <template #extra>
      <span>50%</span>
    </template>
  </weui-progress>
  <weui-badge :value="badgeVal" :max="30">
    <template #content> 测试测试 </template>
  </weui-badge>
  <weui-article>
    <h1>这是weui文章</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </weui-article>

  <weui-flex>
    <weui-flex-item>weui-flex</weui-flex-item>
    <weui-flex-item :flex="2">weui-flex</weui-flex-item>
    <weui-flex-item>weui-flex</weui-flex-item>
  </weui-flex>

  <weui-grids>
    <weui-grid
      icon="https://weui.io//images/icon_tabbar.png"
      label="Grid"
    ></weui-grid>
    <weui-grid
      icon="https://weui.io//images/icon_tabbar.png"
      label="Grid"
    ></weui-grid>
    <weui-grid
      icon="https://weui.io//images/icon_tabbar.png"
      label="Grid"
    ></weui-grid>
  </weui-grids>
  <weui-loadmore type="dot"></weui-loadmore>

  <weui-cells title="cells标题">
    <weui-cell arrow>这是一段文本</weui-cell>
    <weui-cell arrow>这是一段文本</weui-cell>
  </weui-cells>

  <weui-panel>
    <template #hd>Panel title</template>
    <weui-media-box
      type="appmsg"
      title="标题1"
      desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"
    ></weui-media-box>
    <weui-media-box
      type="appmsg"
      title="标题2"
      desc="由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。"
    ></weui-media-box>
    <template #ft>
      <weui-cell link arrow>查看详情</weui-cell>
    </template>
  </weui-panel>

  <weui-preview>
    <template #hd>
      <weui-preview-item label="付款金额" value="#24000.00"></weui-preview-item>
    </template>
    <weui-preview-item label="商品" value="打蛋机"></weui-preview-item>
    <weui-preview-item label="标题" value="这是一段文本"></weui-preview-item>
    <template #ft>
      <weui-preview-btn @click="activeStep++">操作</weui-preview-btn>
    </template>
  </weui-preview>

  <weui-steps v-model="activeStep" direction="horizontal">
    <weui-step-item :step="0" title="标题" desc="描述"></weui-step-item>
    <weui-step-item :step="1" title="标题" desc="描述"></weui-step-item>
    <weui-step-item :step="2" title="标题" desc="描述"></weui-step-item>
  </weui-steps>

  <weui-button @click="visible = true">打开toast</weui-button>
  <weui-toast v-model="visible" type="warn" text="成功提示"></weui-toast>

  <weui-button @click="visibleActionSheet = true">打开action-sheet</weui-button>
  <weui-action-sheet
    v-model="visibleActionSheet"
    :menus="menus"
    title="这是标题"
    :actions="actions"
  >
    <template #menu="{ menu }">{{ menu.label }}--自定义</template>
  </weui-action-sheet>
  <weui-button @click="visibleDialog = true">打开dialog</weui-button>
  <weui-dialog v-model="visibleDialog" title="标题" desc="描述" :ok-text="null">
    <template #hd>自定义标题</template>
  </weui-dialog>

  <weui-button @click="visibleHalf = true">打开half-screen</weui-button>
  <weui-half-screen-dialog
    v-model="visibleHalf"
    icon-type="slide-down"
    title="测试"
    sub-title="副标题"
    slide
  >
  </weui-half-screen-dialog>

  <weui-msg
    type="success"
    title="操作成功"
    desc="内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现文字链接"
  >
    <template #opr-area>
      <weui-button type="primary">推荐操作</weui-button>
    </template>
    <template #tips-area>
      提示详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现文字链接
    </template>
    <template #extra-area> 底部链接区域 </template>
  </weui-msg>

  <weui-button @click="formRef?.resetFields()">打开Picker</weui-button>
  <weui-alert
    v-model="visiblePicker"
    type="default"
    text="测试测试测试"
  ></weui-alert>

  <weui-navbar v-model="navBar">
    <weui-navbar-item
      v-for="nav in navBars"
      :key="nav.value"
      :label="nav.label"
      :value="nav.value"
    >
      {{ nav.label }}
    </weui-navbar-item>
  </weui-navbar>

  <weui-tabbar v-model="navBar">
    <weui-tabbar-item
      v-for="tab in navBars"
      :key="tab.value"
      :label="tab.label"
      :value="tab.value"
      :icon="tab.icon"
    >
      {{ tab.label }} ---- Tab
    </weui-tabbar-item>
  </weui-tabbar>

  <weui-searchbar v-model="searchKey"></weui-searchbar>

  <weui-form ref="formRef" :model="formData">
    <weui-form-group title="表单信息">
      <weui-form-item label="测试测试" name="name" :rule="rules.name">
        <weui-input
          v-model="formData.name"
          placeholder="请输入内容"
          allow-clear
          disabled="true"
        ></weui-input>
      </weui-form-item>
      <weui-form-item label="开关" name="switch">
        <weui-switch v-model="formData.switch" disabled></weui-switch>
      </weui-form-item>
      <weui-form-item label="测试测试" name="name" :rule="rules.name">
        <weui-textarea
          v-model="formData.text"
          placeholder="请输入内容"
          :maxlength="100"
          :showNum="true"
          disabled="true"
        ></weui-textarea>
      </weui-form-item>
      <weui-form-item label="选择器" name="picker">
        <weui-picker
          v-model="formData.picker"
          :options="pickerOptions"
          placeholder="请输入内容"
          :is-multi="true"
        ></weui-picker>
      </weui-form-item>
      <weui-form-item label="日期" name="date">
        <weui-date-picker
          v-model="formData.date"
          placeholder="请选择日期内容"
          cron="1-10 * *"
        ></weui-date-picker>
      </weui-form-item>
      <weui-form-item label="时间" name="time">
        <weui-time-picker
          v-model="formData.date"
          placeholder="请选择时间"
          cron="* * *"
        ></weui-time-picker>
      </weui-form-item>
    </weui-form-group>
  </weui-form>

  <div class="fix-btn" @click="utils.closeAllPicker()">固定</div>
  <div class="fix-btn fix-btn-2" @click="visibleGallery = !visibleGallery">
    打开图片预览
  </div>

  <weui-uploader
    v-model="fileList"
    action="http://localhost:8080/upload"
    :multiple="true"
    :before-send="beforeSend"
    :custom-sebd="customUpload"
    :repeat-upload="false"
  >
    <!-- <template #uploadBtn>
      <weui-button type="primary">上传文件</weui-button>
    </template> -->
  </weui-uploader>

  <weui-gallery
    :initial-index="galleryIndex"
    :visible="visibleGallery"
    :urls="images"
    @close="visibleGallery = false"
    @delete="(index) => images.splice(index, 1)"
  ></weui-gallery>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import {
  // Toast,
  // ActionSheet,
  // Dialog,
  // Alert,
  // Gallery,
  FormInstance,
  Rules,
  utils
} from 'vue-weui-component';

const sliderVal = ref(0);
const badgeVal = ref(20);
const visible = ref(false);
const activeStep = ref(1);
const visibleActionSheet = ref(false);
const visibleDialog = ref(false);
const visibleHalf = ref(false);
const visiblePicker = ref(false);
const navBar = ref('menu1');
const searchKey = ref('');
const fileList = ref([]);
const images = ref([
  'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
  'https://imgs.699pic.com/images/500/465/562.jpg!list1x.v2'
]);
const visibleGallery = ref(false);
const galleryIndex = ref(0);

const formData = ref({
  name: undefined,
  text: '',
  switch: false,
  picker: undefined,
  date: undefined,
  time: undefined
});
const formRef = ref<FormInstance>();
const rules: Rules = {
  name: [
    {
      type: 'string',
      message: '必填项'
    },
    {
      len: 5,
      message: '不能大于100'
    }
  ]
};

const menus = [
  { label: '菜单1', id: 1 },
  { label: '菜单2', id: 2 }
];
const actions = [{ label: '取消', key: 'cancel' }];

const navBars = ref([
  {
    label: '菜单1',
    value: 'menu1',
    icon: 'https://weui.io/images/icon_tabbar.png'
  },
  {
    label: '菜单2',
    value: 'menu2',
    icon: 'https://weui.io/images/icon_tabbar.png'
  }
]);

const pickerOptions = [
  {
    label: 'label1',
    value: 1,
    children: [
      { label: 'child1', value: 6 },
      { label: 'child2', value: 7 }
    ]
  },
  { label: 'label2', value: 2 },
  { label: 'label3', value: 3 },
  { label: 'label4', value: 4 },
  { label: 'label5', value: 5 }
];

const beforeSend = () => {
  return {
    headers: {
      name: 'xxx'
    }
  };
};

const customUpload = async () => {
  return {
    status: 'success',
    url: 'xxx'
  };
};

// const manualGallery = () => {
//   const closeGallery = Gallery.gallery({
//     urls: images.value,
//     onChange: (index: number) => {
//       console.log(index);
//     },
//     onClose: () => {
//       console.log('gallery close');
//       closeGallery && closeGallery();
//     },
//     onDelete: (index: number, url: string) => {
//       console.log('gallery delete', index, url);
//     }
//   });
// };

// const customSend = async (file: any) => {
//   console.log(file);
// };

onMounted(() => {
  // Toast.toast({
  //   text: '测试函数调用',
  //   type: 'loading',
  //   duration: 0
  // });
  // ActionSheet.actionSheet({
  //   title: '这是标题',
  //   menus,
  //   actions,
  //   onClick(item) {
  //     console.log(item);
  //   }
  // });
  // Dialog.dialog({
  //   title: '标题',
  //   desc: '描述描述',
  //   onCancel() {
  //     console.log('取消');
  //   },
  //   onOk() {
  //     console.log('确认');
  //   }
  // });
  // Alert.alert({
  //   text: '测试测试',
  //   duration: 0,
  //   type: 'warn-primary'
  // });
  // formRef.value?.validate().then((res) => {
  //   console.log(res);
  // });
});
</script>

<style>
#app {
  background-color: var(--weui-BG-0);
  padding: 16px 16px 80px;
  box-sizing: border-box;
}

.fix-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #ededed;
  border-radius: 4px;
  padding: 4px 8px;
  box-sizing: border-box;
  z-index: 10000;
}

.fix-btn-2 {
  left: 80px;
}
</style>
