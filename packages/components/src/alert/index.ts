import _Alert from './alert.vue';
import { withInstall } from '../utils';
import { alert } from './alert';

type AlertType = typeof _Alert & {
  alert: typeof alert;
};
export const Alert = withInstall<AlertType>(_Alert as AlertType);
Alert.alert = alert;
export default Alert;
