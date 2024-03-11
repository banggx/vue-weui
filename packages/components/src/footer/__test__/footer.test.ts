import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Footer from '../footer.vue';
import FooterLink from '../footerLink.vue';

describe('weui-footer', () => {
  it('render footer text', () => {
    const footerText = 'Flex';
    const wrapper = mount(Footer, {
      props: {
        text: footerText
      }
    });
    expect(wrapper.find('.weui-footer__text').text()).toBe(footerText);
  });
  it('render footer default slot', () => {
    const footerSlot = 'custom text';
    const wrapper = mount(Footer, {
      slots: {
        default: footerSlot
      }
    });
    expect(wrapper.find('.weui-footer__text').text()).toBe(footerSlot);
  });
  it('render footer links slot', () => {
    const footerSlot = 'custom links';
    const wrapper = mount(Footer, {
      slots: {
        links: footerSlot
      }
    });
    expect(wrapper.find('.weui-footer__links').exists()).toBe(true);
    expect(wrapper.find('.weui-footer__links').text()).toBe(footerSlot);
  });
});

describe('weui-footer-link', () => {
  it('render footer link props', () => {
    const link = 'test link';
    const target = '_blank';
    const wrapper = mount(FooterLink, {
      props: {
        link,
        target
      }
    });
    expect(wrapper.attributes().href).toBe(link);
    expect(wrapper.attributes().target).toBe(target);
  });
  it('render footer slot', () => {
    const linkSlot = 'link slot';
    const wrapper = mount(FooterLink, {
      slots: {
        default: linkSlot
      }
    });
    expect(wrapper.text()).toBe(linkSlot);
  });
});
