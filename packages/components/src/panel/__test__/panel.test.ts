import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Panel from '../panel.vue';

describe('weui-panel', () => {
  it('render default slot', () => {
    const defaultSlot = 'default slot';
    const wrapper = mount(Panel, {
      slots: {
        default: defaultSlot
      }
    });
    expect(wrapper.find('.weui-panel__bd').text()).toBe(defaultSlot);
  });

  it('render hd slot', () => {
    const hdSlot = 'hd slot';
    const wrapper = mount(Panel, {
      slots: {
        hd: hdSlot
      }
    });
    expect(wrapper.find('.weui-panel__hd').exists()).toBe(true);
    expect(wrapper.find('.weui-panel__hd').text()).toBe(hdSlot);
  });

  it('render ft slot', () => {
    const ftSlot = 'ft slot';
    const wrapper = mount(Panel, {
      slots: {
        ft: ftSlot
      }
    });
    expect(wrapper.find('.weui-panel__ft').exists()).toBe(true);
    expect(wrapper.find('.weui-panel__ft').text()).toBe(ftSlot);
  });
});
