import { h, render } from 'vue';
import Toast from './toast.vue';
import { shortid } from '../utils';

interface ToastOptions {
  text?: string;
  type?: 'success' | 'warn' | 'text' | 'loading';
  longText?: boolean;
  duration?: number;
}
export function toast(options: ToastOptions) {
  const { text, type, longText, duration = 2000 } = options;

  const vnode = h(Toast, {
    text,
    type,
    long: longText,
    modelValue: true
  });
  const toastFragment = document.createElement('div');
  toastFragment.classList.add(`weui-toast_${shortid(16)}`);
  document.body.appendChild(toastFragment);
  render(vnode, toastFragment);

  const hide = () => {
    render(null, toastFragment);
    document.body.removeChild(toastFragment);
  };

  let timer: NodeJS.Timeout;
  // 当duration <= 0 时，不自动启动定时器关闭toast
  if (duration > 0) {
    timer = setTimeout(hide, duration);
  }

  return () => {
    timer && clearTimeout(timer);
    hide();
  };
}
