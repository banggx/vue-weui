import _Footer from './footer.vue';
import _FooterLink from './footerLink.vue';
import { withInstall } from 'vue-weui-utils';

export const Footer = withInstall(_Footer);
export const FooterLink = withInstall(_FooterLink);
Footer.FooterLink = FooterLink;
export default Footer;
