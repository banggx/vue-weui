import { h, render } from 'vue';
import Alert from './alert.vue';
import { shortid } from 'vue-weui-utils';

interface AlertOptions {
  text: string;
  type?: 'warn-primary' | 'warn' | 'default' | 'tips-primary' | 'tips';
  showIcon?: boolean;
  showClose?: boolean;
  duration?: number;
  onClose?: () => void;
}
export function alert(options: AlertOptions) {
  const { text, showIcon, showClose, type, duration = 3000, onClose } = options;

  let timer: NodeJS.Timeout;
  const alertFragment = document.createElement('div');
  alertFragment.classList.add(`weui-alert_${shortid(16)}`);
  document.body.appendChild(alertFragment);

  const closeAlert = () => {
    render(null, alertFragment);
    document.body.removeChild(alertFragment);
    timer && clearTimeout(timer);
    onClose?.();
  };

  const vnode = h(Alert, {
    text,
    type,
    showClose,
    showIcon,
    modelValue: true,
    onClose: closeAlert
  });

  render(vnode, alertFragment);

  if (duration) {
    timer = setTimeout(closeAlert, duration);
  }

  return closeAlert;
}
