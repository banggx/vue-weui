import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Grid from '../grid.vue';

describe('weui-grid', () => {
  it('render grid props', () => {
    const gridIcon = 'https://weui.io//images/icon_tabbar.png';
    const gridLabel = 'Grid';
    const wrapper = mount(Grid, {
      props: {
        icon: gridIcon,
        label: gridLabel
      }
    });
    expect(wrapper.find('.weui-grid__icon img').attributes().src).toBe(
      gridIcon
    );
    expect(wrapper.find('.weui-grid__label').text()).toBe(gridLabel);
  });

  it('render grid slots', () => {
    const iconSlot = 'custom Icon';
    const labelSlot = 'custom lable';
    const wrapper = mount(Grid, {
      slots: {
        icon: iconSlot,
        label: labelSlot
      }
    });
    expect(wrapper.find('.weui-grid__icon').text()).toBe(iconSlot);
    expect(wrapper.find('.weui-grid__label').text()).toBe(labelSlot);
  });

  it('render grid click event', async () => {
    const wrapper = mount(Grid, {
      props: {
        label: 'Grid'
      }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).haveOwnProperty('click');
  });
});
