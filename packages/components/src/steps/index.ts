import _Steps from './steps.vue';
import _StepItem from './stepItem.vue';
import { withInstall } from 'vue-weui-utils';

type StepsType = typeof _Steps & {
  StepItem: typeof _StepItem;
};
export const Steps = withInstall<StepsType>(_Steps as StepsType);
export const StepItem = withInstall(_StepItem);
Steps.StepItem = StepItem;
export default Steps;
