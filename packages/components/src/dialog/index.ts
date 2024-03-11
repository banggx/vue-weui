import _Dialog from './dialog.vue';
import { dialog } from './dialog';
import { withInstall } from 'vue-weui-utils';

type DialogType = typeof _Dialog & {
  dialog: typeof dialog;
};
export const Dialog = withInstall<DialogType>(_Dialog as DialogType);
Dialog.dialog = dialog;
export default Dialog;
