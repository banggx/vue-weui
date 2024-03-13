import _Navbar from './navbar.vue';
import _NavbarItem from './navbarItem.vue';
import { withInstall } from '../utils';

type NavBarType = typeof _Navbar & {
  NavbarItem: typeof _NavbarItem;
};
export const Navbar = withInstall<NavBarType>(_Navbar as NavBarType);
export const NavbarItem = withInstall(_NavbarItem);
Navbar.NavbarItem = NavbarItem;
export default Navbar;
