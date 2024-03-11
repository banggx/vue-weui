import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Cells from '../cells.vue';

describe('weui-cells', () => {
  it('render cells title', () => {
    const titleText = 'cells标题';
    const wrapper = mount(Cells, {
      props: {
        title: titleText
      }
    });
    expect(wrapper.find('.weui-cells__title').text()).toBe(titleText);
  });

  it('render default slot', () => {
    const slotText = 'custom slot contet';
    const wrapper = mount(Cells, {
      slots: {
        default: slotText
      }
    });
    expect(wrapper.find('.weui-cells').text()).toBe(slotText);
  });
});
