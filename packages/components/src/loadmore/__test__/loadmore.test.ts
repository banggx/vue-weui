import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Loadmore from '../loadmore.vue';

describe('weui-loadmore', () => {
  it('render loadmore type', () => {
    const types = ['default', 'line', 'dot'];
    for (const type in types) {
      const wrapper = mount(Loadmore, {
        props: {
          type: type as any
        }
      });
      expect(wrapper.classes()).toContain('weui-loadmore');
      if (type === 'default') {
        expect(wrapper.find('.weui-primary-loading').exists()).toBe(true);
      }
      if (type === 'line') {
        expect(wrapper.classes()).toContain('weui-loadmore_line');
      }
      if (type === 'dot') {
        expect(wrapper.classes()).toContain('weui-loadmore_line');
        expect(wrapper.classes()).toContain('weui-loadmore_line');
        expect(wrapper.find('.weui-loadmore__tips').text()).toBe('');
      }
    }
  });

  it('render loadmore default slot', () => {
    const slotText = 'custom text';
    const wrapper = mount(Loadmore, {
      slots: {
        default: slotText
      }
    });
    expect(wrapper.find('.weui-loadmore__tips').text()).toBe(slotText);
  });

  it('render loadmore props text', () => {
    const propsText = 'custom text';
    const wrapper = mount(Loadmore, {
      props: {
        text: propsText
      }
    });
    expect(wrapper.find('.weui-loadmore__tips').text()).toBe(propsText);
  });
});
