import _TabBar from './tabbar.vue';
import _TabBarItem from './tabbarItem.vue';
import { withInstall } from '../utils';

type TabBarType = typeof _TabBar & {
  TabBarItem: typeof _TabBarItem;
};
export const TabBar = withInstall<TabBarType>(_TabBar as TabBarType);
export const TabBarItem = withInstall(_TabBarItem);
TabBar.TabBarItem = TabBarItem;
export default TabBar;
