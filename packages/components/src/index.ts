import './common/styles.less';

// 基础组件
import Button from './button';
import Icon from './icon';
import Badge from './badge';
import Article from './article';
import Flex from './flex';
import Footer from './footer';
import Grid from './grid';
import Loadmore from './loadmore';
import Cells from './cells';
import Toast from './toast';
import Panel from './panel';
import MediaBox from './mediabox';
import Preview from './preview';
import Steps from './steps';
import Mask from './mask';
import Actionsheet from './actionsheet';
import Dialog from './dialog';
import HalfScreenDialog from './halfScreenDialog';
import Msg from './msg';
import Alert from './alert';
import Navbar from './navbar';
import Tabbar from './tabbar';
import Searchbar from './searchbar';
import Form from './form';
import Input from './input';
import Picker from './picker';
import DatePicker from './datePicker';
import TimePicker from './timePicker';
import Textarea from './textarea';
import Switch from './switch';
import Uploader from './uploader';
import Gallery from './gallery';
import Utils from './utils/exports';
import Calendar from './calendar';
import { CalendarPicker } from './calendar';

export {
  Button,
  Icon,
  Badge,
  Article,
  Flex,
  Footer,
  Grid,
  Loadmore,
  Cells,
  Toast,
  Panel,
  MediaBox,
  Preview,
  Steps,
  Mask,
  Actionsheet,
  Dialog,
  HalfScreenDialog,
  Msg,
  Alert,
  Navbar,
  Tabbar,
  Searchbar,
  Form,
  Input,
  Picker,
  DatePicker,
  TimePicker,
  Textarea,
  Switch,
  Uploader,
  Gallery,
  Utils,
  Utils as utils,
  Calendar,
  CalendarPicker
};

const components = [
  Button,
  Icon,
  Badge,
  Article,
  Flex,
  Footer,
  Grid,
  Loadmore,
  Cells,
  Toast,
  Panel,
  MediaBox,
  Preview,
  Steps,
  Mask,
  Actionsheet,
  Dialog,
  HalfScreenDialog,
  Msg,
  Alert,
  Navbar,
  Tabbar,
  Searchbar,
  Form,
  Input,
  Picker,
  DatePicker,
  TimePicker,
  Textarea,
  Switch,
  Uploader,
  Gallery,
  Calendar,
  CalendarPicker
];

const install = (app: any) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

export default {
  install
};
