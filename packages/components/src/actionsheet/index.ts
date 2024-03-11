import _ActionSheet from './actionsheet.vue';
import { actionSheet } from './actionsheet';
import { withInstall } from 'vue-weui-utils';

type ActionSheetType = typeof _ActionSheet & {
  actionSheet: typeof actionSheet;
};
export const ActionSheet = withInstall<ActionSheetType>(
  _ActionSheet as ActionSheetType
);
ActionSheet.actionSheet = actionSheet;
export default ActionSheet;
