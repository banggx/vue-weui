import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Cell from '../cell.vue';

describe('weui-cell', () => {
  it('render cell props', () => {
    const wrapper = mount(Cell, {
      props: {
        arrow: true,
        link: true
      }
    });
    expect(wrapper.classes()).toContain('weui-cell_access');
    expect(wrapper.classes()).toContain('weui-cell_link');
  });

  it('render slots', () => {
    const defaultSlotText = 'default slot contet';
    const hdSlotText = 'hd slot contet';
    const ftSlotText = 'ft slot contet';
    const wrapper = mount(Cell, {
      slots: {
        default: defaultSlotText,
        hd: hdSlotText,
        ft: ftSlotText
      }
    });
    expect(wrapper.find('.weui-cell__bd').text()).toBe(defaultSlotText);
    expect(wrapper.find('.weui-cell__hd').text()).toBe(hdSlotText);
    expect(wrapper.find('.weui-cell__ft').text()).toBe(ftSlotText);
  });
});
