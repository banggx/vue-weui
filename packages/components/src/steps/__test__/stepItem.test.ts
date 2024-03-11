import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import StepItem from '../stepItem.vue';

describe('weui-steps-item', () => {
  it('render props', () => {
    const title = 'title';
    const desc = 'desc';
    const wrapper = mount(StepItem, {
      props: {
        title,
        desc
      }
    });
    expect(wrapper.find('.weui-steps__item__title').text()).toBe(title);
    expect(wrapper.find('.weui-steps__item__desc').text()).toBe(desc);
  });

  it('render props icon', () => {
    const wrapper = mount(StepItem, {
      props: {
        icon: 'waiting'
      }
    });
    expect(wrapper.classes()).toContain('weui-steps__item_icon');
    expect(wrapper.find('.weui-steps__icon').exists()).toBe(true);

    const icons = ['waiting', 'success'];
    for (const icon of icons) {
      const wrapper = mount(StepItem, {
        props: {
          icon: icon as any
        }
      });
      expect(wrapper.find('.weui-steps__icon').classes()).toContain(
        `weui-icon-${icon}`
      );
    }
  });
});
