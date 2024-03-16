import _Form from './form.vue';
import _FormGroup from './formGroup.vue';
import _FormItem from './formItem.vue';
import { withInstall } from '../utils';
export * from './types';

type FormType = typeof _Form & {
  FormGroup: typeof _FormGroup;
  FormItem: typeof _FormItem;
};
export const Form = withInstall<FormType>(_Form as FormType);
export const FormGroup = withInstall(_FormGroup);
export const FormItem = withInstall(_FormItem);
Form.FormGroup = FormGroup;
Form.FormItem = FormItem;
export default Form;
