import _Flex from './flex.vue';
import _FlexItem from './flexItem.vue';
import { withInstall } from 'vue-weui-utils';

export const Flex = withInstall(_Flex);
export const FlexItem = withInstall(_FlexItem);
Flex.FlexItem = FlexItem;
export default Flex;
