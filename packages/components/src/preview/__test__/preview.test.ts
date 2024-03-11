import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Preview from '../preview.vue';

describe('weui-preview', () => {
  it('render default slot', () => {
    const defaultSlot = 'default slot';
    const wrapper = mount(Preview, {
      slots: {
        default: defaultSlot
      }
    });
    expect(wrapper.find('.weui-form-preview__bd').text()).toBe(defaultSlot);
  });

  it('render hd slot', () => {
    const hdSlot = 'hd slot';
    const wrapper = mount(Preview, {
      slots: {
        hd: hdSlot
      }
    });
    expect(wrapper.find('.weui-form-preview__hd').exists()).toBe(true);
    expect(wrapper.find('.weui-form-preview__hd').text()).toBe(hdSlot);
  });

  it('render ft slot', () => {
    const ftSlot = 'ft slot';
    const wrapper = mount(Preview, {
      slots: {
        ft: ftSlot
      }
    });
    expect(wrapper.find('.weui-form-preview__ft').exists()).toBe(true);
    expect(wrapper.find('.weui-form-preview__ft').text()).toBe(ftSlot);
  });
});
