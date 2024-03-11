import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import PreviewItem from '../previewItem.vue';

describe('weui-preview-item', () => {
  it('render preview item props', () => {
    const label = 'label';
    const value = 'value';
    const wrapper = mount(PreviewItem, {
      props: {
        label,
        value
      }
    });
    expect(wrapper.find('.weui-form-preview__label').text()).toBe(label);
    expect(wrapper.find('.weui-form-preview__value').text()).toBe(value);
  });

  it('render label slot', () => {
    const labelSlot = 'label slot';
    const wrapper = mount(PreviewItem, {
      slots: {
        label: labelSlot
      }
    });
    expect(wrapper.find('.weui-form-preview__label').text()).toBe(labelSlot);
  });

  it('render value slot', () => {
    const valueSlot = 'value slot';
    const wrapper = mount(PreviewItem, {
      slots: {
        value: valueSlot
      }
    });
    expect(wrapper.find('.weui-form-preview__value').text()).toBe(valueSlot);
  });
});
