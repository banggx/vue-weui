import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Mask from '../mask.vue';

describe('weui-mask', () => {
  it('render mask type', () => {
    const types = ['transparent', 'default'];
    for (const type of types) {
      const wrapper = mount(Mask, {
        props: {
          type: type as any
        }
      });
      if (type === 'transparant') {
        expect(wrapper.classes()).toContain('weui-mask_transparent');
      }
      if (type === 'default') {
        expect(wrapper.classes()).toContain('weui-mask');
      }
    }
  });

  it('render default slot', () => {
    const defaultSlot = 'defaultSlot';
    const wrapper = mount(Mask, {
      slots: {
        default: defaultSlot
      }
    });
    expect(wrapper.text()).toBe(defaultSlot);
  });
});
