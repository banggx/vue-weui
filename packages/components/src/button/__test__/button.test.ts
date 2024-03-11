import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from '../button.vue';

describe('weui-button', () => {
  it('should render solt', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'vue-weui'
      }
    });
    expect(wrapper.text()).toContain('vue-weui');
  });
  it('should type class', () => {
    const types: any[] = ['default', 'primary', 'warn'];
    for (const type of types) {
      const wrapper = mount(Button, {
        props: { type }
      });
      expect(wrapper.classes()).toContain(`weui-btn_${type}`);
    }
  });
  it('should size class', () => {
    const sizes: any[] = ['medium', 'mini'];
    for (const size of sizes) {
      const wrapper = mount(Button, {
        props: { size }
      });
      expect(wrapper.classes()).toContain(`weui-btn_${size}`);
    }
  });
  it('should disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    });
    expect(wrapper.classes()).toContain(`weui-btn_disabled`);
    // 点击事件不可触发
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toEqual({});
    expect(wrapper.props().disabled).toBe(true);
  });
  it('should render loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    });
    expect(wrapper.classes()).toContain('weui-btn_loading');
    expect(wrapper.find('i.weui-mask-loading').exists()).toBe(true);
  });

  it('click event emit', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'button'
      }
    });
    // 点击事件不可触发
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
