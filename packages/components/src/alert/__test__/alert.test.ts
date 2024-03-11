import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Alert from '../alert.vue';

describe('weui-alert', () => {
  it('render alert text props', () => {
    const text = 'alert文本';
    const wrapper = mount(Alert, {
      props: {
        modelValue: true,
        text,
        showClose: true,
        showIcon: true
      }
    });
    expect(wrapper.find('.weui-information-bar__bd').text()).toBe(text);
    expect(wrapper.find('.weui-information-bar__hd').exists()).toBe(true);
    expect(
      wrapper.find('.weui-information-bar__ft .weui-btn_icon').exists()
    ).toBe(true);
  });

  it('render alert type props', () => {
    const types = ['warn-primary', 'warn', 'default', 'tips-primary', 'tips'];
    for (const type of types) {
      const wrapper = mount(Alert, {
        props: {
          modelValue: true,
          type: type as any
        }
      });
      if (type === 'warn-primary') {
        expect(wrapper.find('.weui-information-bar').classes()).toContain(
          'weui-information-bar_warn-strong'
        );
      }
      if (type === 'warn') {
        expect(wrapper.find('.weui-information-bar').classes()).toContain(
          'weui-information-bar_warn-weak'
        );
      }
      if (type === 'default') {
        expect(wrapper.find('.weui-information-bar').classes()).toContain(
          'weui-information-bar_warn-no-color'
        );
      }
      if (type === 'tips-primary') {
        expect(wrapper.find('.weui-information-bar').classes()).toContain(
          'weui-information-bar_tips-strong'
        );
      }
      if (type === 'tips') {
        expect(wrapper.find('.weui-information-bar').classes()).toContain(
          'weui-information-bar_tips-weak'
        );
      }
    }
  });

  it('render not show icon', () => {
    const wrapper = mount(Alert, {
      props: {
        modelValue: true,
        showIcon: false
      }
    });
    expect(wrapper.find('.weui-information-bar__hd').exists()).toBe(false);
  });

  it('render not show close', () => {
    const wrapper = mount(Alert, {
      props: {
        modelValue: true,
        showClose: false
      }
    });
    expect(
      wrapper.find('.weui-information-bar__ft .weui-btn_icon').exists()
    ).toBe(false);
  });

  it('render alert slot', () => {
    const iconSlot = 'icon slot';
    const defaultSlot = 'default slot';
    const extraSlot = 'extra slot';
    const wrapper = mount(Alert, {
      props: {
        modelValue: true
      },
      slots: {
        default: defaultSlot,
        icon: iconSlot,
        extra: extraSlot
      }
    });
    expect(wrapper.find('.weui-information-bar__bd').text()).toBe(defaultSlot);
    expect(wrapper.find('.weui-information-bar__hd').text()).toBe(iconSlot);
    expect(wrapper.find('.weui-information-bar__ft').text()).toBe(extraSlot);
  });

  it('render close event', async () => {
    const wrapper = mount(Alert, {
      props: {
        modelValue: true
      }
    });
    await wrapper
      .find('.weui-information-bar__ft .weui-btn_icon')
      .trigger('click');
    expect(wrapper.emitted()).haveOwnProperty('close');
  });

  it('render not visible', async () => {
    const wrapper = mount(Alert, {
      props: {
        modelValue: false
      }
    });
    expect(wrapper.find('.weui-information-bar').exists()).toBe(false);
  });
});
