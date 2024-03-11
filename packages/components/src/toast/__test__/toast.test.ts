import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Toast from '../toast.vue';

describe('weui-toast', () => {
  it('render toast type', () => {
    const types = ['success', 'warn', 'text', 'loading'];
    for (const type in types) {
      const wrapper = mount(Toast, {
        props: {
          modelValue: true,
          type: type as any
        }
      });
      if (type === 'success') {
        expect(wrapper.find('.weui-icon_toast').classes()).toContain(
          'weui-icon-success-no-circle'
        );
      }
      if (type === 'warn') {
        expect(wrapper.find('.weui-icon_toast').classes()).toContain(
          'weui-icon-warn'
        );
      }
      if (type === 'loading') {
        expect(wrapper.find('.weui-icon_toast').classes()).toContain(
          'weui-primary-loading'
        );
      }
      if (type === 'text') {
        expect(wrapper.find('.weui-toast').classes()).toContain(
          'weui-toast_text'
        );
        expect(wrapper.find('.weui-icon_toast').exists()).toBe(false);
      }
    }
  });

  it('render toast long props', () => {
    const wrapper = mount(Toast, {
      props: {
        modelValue: true,
        long: true
      }
    });
    expect(wrapper.find('.weui-toast').classes()).toContain(
      'weui-toast_text-more'
    );
  });

  it('render toast text props', () => {
    const toastText = 'test props';
    const wrapper = mount(Toast, {
      props: {
        modelValue: true,
        text: toastText
      }
    });
    expect(wrapper.find('.weui-toast__content').text()).toBe(toastText);
  });

  it('render toast no visible', () => {
    const wrapper = mount(Toast, {
      props: {
        modelValue: false
      }
    });
    expect(wrapper.attributes().style).toBe('display: none;');
  });
});
