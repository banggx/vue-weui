import DefaultTheme from 'vitepress/theme';
import DynamicLayout from '../components/DynamicLayout.vue'
import Toast from '../components/Toast.vue';
import ActionSheet from '../components/ActionSheet.vue';
import Dialog from '../components/Dialog.vue';
import HalfScreenDialog from '../components/HalfScreenDialog.vue';
import Alert from '../components/Alert.vue';
import NavBar from '../components/NavBar.vue';
import TabBar from '../components/TabBar.vue';
import ValidateForm from '../components/ValidateForm.vue';
import Picker from '../components/Picker.vue';
import DatePicker from '../components/DatePicker.vue';
import TimePicker from '../components/TimePicker.vue';

export default {
  ...DefaultTheme,
  Layout: DynamicLayout,
  enhanceApp: async ({ app }) => {
    app.mixin({
      async mounted() {
        import('vue-weui-next').then(module => {
          app.use(module.default)
        })
      },
    })
    app.component('custom-toast', Toast);
    app.component('custom-actionsheet', ActionSheet);
    app.component('custom-dialog', Dialog);
    app.component('custom-halfscreen-dialog', HalfScreenDialog);
    app.component('custom-alert', Alert);
    app.component('custom-navbar', NavBar);
    app.component('custom-tabbar', TabBar);
    app.component('custom-validate-form', ValidateForm);
    app.component('custom-picker', Picker);
    app.component('custom-date-picker', DatePicker);
    app.component('custom-time-picker', TimePicker);
  },
};
