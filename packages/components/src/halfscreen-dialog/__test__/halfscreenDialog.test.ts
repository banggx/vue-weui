import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import HalfScreenDialog from '../halfscreenDialog.vue';

describe('weui-half-screen-dialog', () => {
  it('render showClose props', () => {
    const wrapper = mount(HalfScreenDialog, {
      props: {
        modelValue: true,
        showClose: true
      }
    });
    expect(
      wrapper.find('.weui-half-screen-dialog__hd__side .js_close').exists()
    ).toBe(true);
  });

  it('render title props', () => {
    const title = 'title';
    const subTitle = 'sub title';
    const wrapper = mount(HalfScreenDialog, {
      props: {
        modelValue: true,
        showClose: true,
        title: title,
        subTitle: subTitle
      }
    });
    expect(wrapper.find('.weui-half-screen-dialog__title').text()).toBe(title);
    expect(wrapper.find('.weui-half-screen-dialog__subtitle').text()).toBe(
      subTitle
    );
  });

  it('render iconType props', () => {
    const icons = ['close', 'slide-down'];
    for (const icon in icons) {
      const wrapper = mount(HalfScreenDialog, {
        props: {
          modelValue: true,
          showClose: true,
          iconType: icon as any
        }
      });
      expect(
        wrapper
          .find('.weui-half-screen-dialog__hd__side .js_close .weui-icon')
          .classes()
      ).toContain(`weui-icon-${icon}`);
    }
  });

  it('render slots', () => {
    const defaultSlot = 'defaultSlot';
    const hdSlot = 'hdSlot';
    const extraSlot = 'extraSlot';
    const ftSlot = 'ftSlot';
    const wrapper = mount(HalfScreenDialog, {
      props: {
        modelValue: true,
        showClose: true
      },
      slots: {
        default: defaultSlot,
        hd: hdSlot,
        extra: extraSlot,
        ft: ftSlot
      }
    });
    expect(wrapper.find('.weui-half-screen-dialog__bd').text()).toBe(
      defaultSlot
    );
    expect(wrapper.find('.weui-half-screen-dialog__hd__main').text()).toBe(
      hdSlot
    );
    expect(wrapper.find('.weui-half-screen-dialog__hd__extra').text()).toBe(
      extraSlot
    );
    expect(wrapper.find('.weui-half-screen-dialog__ft').text()).toBe(ftSlot);
  });

  it('render close event', async () => {
    const wrapper = mount(HalfScreenDialog, {
      props: {
        modelValue: true,
        showClose: true
      }
    });
    await wrapper.find('.weui-mask').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');

    await wrapper.find('.weui-half-screen-dialog__hd__side').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
  });

  it('render not visible', async () => {
    const wrapper = mount(HalfScreenDialog, {
      props: {
        modelValue: false
      }
    });
    expect(wrapper.find('.weui-mask').exists()).toBe(false);
    expect(wrapper.find('.weui-half-screen-dialog').exists()).toBe(false);
  });
});
