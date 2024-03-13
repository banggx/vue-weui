import _Tabbar from './tabbar.vue';
import _TabbarItem from './tabbarItem.vue';
import { withInstall } from '../utils';

type TabBarType = typeof _Tabbar & {
  TabbarItem: typeof _TabbarItem;
};
export const Tabbar = withInstall<TabBarType>(_Tabbar as TabBarType);
export const TabbarItem = withInstall(_TabbarItem);
Tabbar.TabbarItem = TabbarItem;
export default Tabbar;
