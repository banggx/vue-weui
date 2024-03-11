import { h, render } from 'vue';
import Dialog from './dialog.vue';
import { shortid } from 'vue-weui-utils';

interface DialogOptions {
  title?: string;
  desc?: string;
  cancelText?: string;
  okText?: string;
  onCancel?: () => void;
  onOk?: () => void;
}
export function dialog(options: DialogOptions) {
  const { title, desc, cancelText, okText, onCancel, onOk } = options;

  const dialogFragment = document.createElement('div');
  dialogFragment.classList.add(`weui-dialog_${shortid(16)}`);
  document.body.appendChild(dialogFragment);
  const closeDialog = () => {
    render(null, dialogFragment);
    document.body.removeChild(dialogFragment);
  };
  const eventHandlerFactory = (handler?: () => void) => {
    return () => {
      closeDialog();
      handler?.();
    };
  };

  const vnode = h(Dialog, {
    title,
    desc,
    cancelText,
    okText,
    modelValue: true,
    onCancel: eventHandlerFactory(onCancel),
    onOk: eventHandlerFactory(onOk)
  });

  render(vnode, dialogFragment);

  return closeDialog;
}
