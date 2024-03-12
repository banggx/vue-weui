import _Preview from './preview.vue';
import _PreviewItem from './previewItem.vue';
import _PreviewBtn from './previewBtn.vue';
import { withInstall } from '../utils';

type PreviewType = typeof _Preview & {
  PreviewItem: typeof _PreviewItem;
  PreviewBtn: typeof _PreviewBtn;
};

export const Preview = withInstall<PreviewType>(_Preview as PreviewType);
export const PreviewItem = withInstall(_PreviewItem);
export const PreviewBtn = withInstall(_PreviewBtn);
Preview.PreviewItem = PreviewItem;
Preview.PreviewBtn = PreviewBtn;
export default Preview;
