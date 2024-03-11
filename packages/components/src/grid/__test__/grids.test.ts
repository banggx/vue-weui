import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Grids from '../grids.vue';

describe('weui-grids', () => {
  it('render grids slot', () => {
    const slotText = 'grids-slot';
    const wrapper = mount(Grids, {
      slots: {
        default: slotText
      }
    });
    expect(wrapper.text()).toBe(slotText);
  });
});
