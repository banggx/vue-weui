import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Msg from '../msg.vue';

describe('weui-msg', () => {
  it('render msg type', () => {
    const types = ['success', 'info', 'waiting', 'warn'];
    for (const type of types) {
      const wrapper = mount(Msg, {
        props: {
          type: type as any
        }
      });
      expect(wrapper.find('.weui-icon_msg').classes()).toContain(
        `weui-icon-${type}`
      );
    }
  });

  it('render other prrops', () => {
    const title = 'title';
    const desc = 'desc';
    const wrapper = mount(Msg, {
      props: {
        title: title,
        desc: desc
      }
    });
    expect(wrapper.find('.weui-msg__title').text()).toBe(title);
    expect(wrapper.find('.weui-msg__desc').text()).toBe(desc);
  });

  it('render msg slots', () => {
    const iconSlot = 'icon slot';
    const titleSlot = 'title slot';
    const descSlot = 'title slot';
    const customSlot = 'custom slot';
    const oprSlot = 'opr slot';
    const tipsSlot = 'tips slot';
    const extraSlot = 'extra slot';
    const wrapper = mount(Msg, {
      slots: {
        'icon-area': iconSlot,
        title: titleSlot,
        desc: descSlot,
        'custom-area': customSlot,
        'opr-area': oprSlot,
        'tips-area': tipsSlot,
        'extra-area': extraSlot
      }
    });
    expect(wrapper.find('.weui-msg__icon-area').text()).toBe(iconSlot);
    expect(wrapper.find('.weui-msg__title').text()).toBe(titleSlot);
    expect(wrapper.find('.weui-msg__desc').text()).toBe(descSlot);
    expect(wrapper.find('.weui-msg__custom-area').text()).toBe(customSlot);
    expect(wrapper.find('.weui-msg__opr-area').text()).toBe(oprSlot);
    expect(wrapper.find('.weui-msg__tips-area').text()).toBe(tipsSlot);
    expect(wrapper.find('.weui-msg__extra-area').text()).toBe(extraSlot);
  });
});
