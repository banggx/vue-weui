import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Dialog from '../dialog.vue';

describe('weui-dialog', () => {
  it('render dialog props', () => {
    const title = '标题';
    const desc = '描述';
    const cancelText = '取消按钮';
    const okText = '确认按钮';
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        title,
        desc,
        cancelText,
        okText
      }
    });
    expect(wrapper.find('.weui-dialog__title').text()).toBe(title);
    expect(wrapper.find('.weui-dialog__bd').text()).toBe(desc);
    expect(
      wrapper.findAll('.weui-dialog__ft .weui-dialog__btn')[0].text()
    ).toBe(cancelText);
    expect(
      wrapper.findAll('.weui-dialog__ft .weui-dialog__btn')[1].text()
    ).toBe(okText);
  });

  it('render dialog slots', () => {
    const hdSlot = 'hd slot';
    const defaultSlot = 'default slot';
    const ftSlot = 'ft slot';
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true
      },
      slots: {
        default: defaultSlot,
        hd: hdSlot,
        ft: ftSlot
      }
    });
    expect(wrapper.find('.weui-dialog__hd').text()).toBe(hdSlot);
    expect(wrapper.find('.weui-dialog__bd').text()).toBe(defaultSlot);
    expect(wrapper.find('.weui-dialog__ft').text()).toBe(ftSlot);
  });

  it('render dialog events', async () => {
    const title = '标题';
    const desc = '描述';
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        title,
        desc
      }
    });
    await wrapper
      .findAll('.weui-dialog__ft .weui-dialog__btn')[0]
      .trigger('click');
    expect(wrapper.emitted()).toHaveProperty('cancel');
    await wrapper
      .findAll('.weui-dialog__ft .weui-dialog__btn')[1]
      .trigger('click');
    expect(wrapper.emitted()).toHaveProperty('ok');
  });

  it('render not dialog btns', async () => {
    const title = '标题';
    const desc = '描述';
    const wrapper = mount(Dialog, {
      props: {
        modelValue: true,
        title,
        desc,
        cancelText: null,
        okText: null
      }
    });
    expect(wrapper.find('.weui-dialog__btn').exists()).toBe(false);
  });
});
