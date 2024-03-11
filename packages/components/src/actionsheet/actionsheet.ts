import { h, render } from 'vue';
import ActionSheet from './actionsheet.vue';
import { shortid } from 'vue-weui-utils';
import type { ActionSheetMenuOrActions } from './types';

interface ActionSheetOptions {
  title?: string;
  menus?: ActionSheetMenuOrActions[];
  actions?: ActionSheetMenuOrActions[];
  onClick?: (item: ActionSheetMenuOrActions) => void;
  onClose?: () => void;
}

export function actionSheet(options: ActionSheetOptions) {
  const { title, menus, actions, onClick, onClose } = options;

  const actionSheetFragment = document.createElement('div');
  actionSheetFragment.classList.add(`weui-actionsheet_${shortid(16)}`);
  document.body.appendChild(actionSheetFragment);
  const closeSheet = () => {
    render(null, actionSheetFragment);
    document.body.removeChild(actionSheetFragment);
    onClose?.();
  };

  const vnode = h(ActionSheet, {
    title,
    menus,
    actions,
    onClick,
    onClose: closeSheet,
    modelValue: true
  });

  render(vnode, actionSheetFragment);

  return closeSheet;
}
