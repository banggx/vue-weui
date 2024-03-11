import _Toast from './toast.vue';
import { toast } from './toast';
import { withInstall } from 'vue-weui-utils';

type ToastType = typeof _Toast & {
  toast: typeof toast;
};
export const Toast = withInstall<ToastType>(_Toast as ToastType);
Toast.toast = toast;
export default Toast;
