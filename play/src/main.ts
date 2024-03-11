import { createApp } from 'vue';
import App from './App.vue';
import Weui from 'vue-weui-component';

const app = createApp(App);
app.use(Weui);
app.mount('#app');
