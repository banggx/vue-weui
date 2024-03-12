import _NavBar from './navbar.vue';
import _NavBarItem from './navbarItem.vue';
import { withInstall } from '../utils';

type NavBarType = typeof _NavBar & {
  NavBarItem: typeof _NavBarItem;
};
export const NavBar = withInstall<NavBarType>(_NavBar as NavBarType);
export const NavBarItem = withInstall(_NavBarItem);
NavBar.NavBarItem = NavBarItem;
export default NavBar;
