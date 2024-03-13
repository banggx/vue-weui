import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import MediaBox from '../mediaBox.vue';

describe('weui-media-box', () => {
  it('render props type', () => {
    const title = '标题';
    const desc = '描述';
    const wrapper = mount(MediaBox, {
      props: {
        title,
        desc
      }
    });
    expect(wrapper.find('.weui-media-box__title').text()).toBe(title);
    expect(wrapper.find('.weui-media-box__desc').text()).toBe(desc);
  });

  it('render default slot', () => {
    const defaultSlot = '自定义内容';
    const wrapper = mount(MediaBox, {
      slots: {
        default: defaultSlot
      }
    });
    expect(wrapper.find('.weui-media-box__bd').text()).toBe(defaultSlot);
  });

  it('render hd slot', () => {
    const hdSlot = '自定义头部内容';
    const wrapper = mount(MediaBox, {
      slots: {
        hd: hdSlot
      }
    });
    expect(wrapper.find('.weui-media-box__hd').exists()).toBe(true);
    expect(wrapper.find('.weui-media-box__hd').text()).toBe(hdSlot);
  });
});
