import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import TimePicker from '../timePicker.vue';

describe('weui-time-picker', () => {
  it('render timePicker', async () => {
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: undefined,
        placeholder: 'placeholder'
      }
    });
    expect(wrapper.find('.weui-time-value').text()).toBe('placeholder');

    // 触发打开选择器
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(document.querySelector('.weui-time-picker-selector')).not.toBeNull();

    // 触发picker事件
    const pickerGroup = document.querySelector(
      '.weui-time-picker-selector .weui-picker__group'
    );
    if (pickerGroup) {
      pickerGroup.scrollTop = 56;
      pickerGroup.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('selectChange');
      // 触发confirm事件
      const confirmBtn = document.querySelector(
        '.weui-time-picker-selector .weui-picker__btn'
      );
      confirmBtn?.dispatchEvent(new Event('click'));
      expect(wrapper.emitted()).toHaveProperty('change');
      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    }
  });

  it('render timePicker disabled', async () => {
    const wrapper = mount(TimePicker, {
      props: {
        modelValue: [1, 2],
        placeholder: 'placeholder',
        disabled: true
      }
    });
    expect(wrapper.find('.weui-time-value').text()).toBe('1:2');
    expect(wrapper.classes()).toContain('weui-picker_diabled');

    wrapper.trigger('click');
  });

  it('render timePicker noCron', async () => {
    const noSecondWrapper = mount(TimePicker, {
      props: {
        modelValue: [1, 2],
        placeholder: 'placeholder',
        cron: '* *'
      }
    });
    noSecondWrapper.trigger('click');

    const noMinuteWrapper = mount(TimePicker, {
      props: {
        modelValue: [1, 2],
        placeholder: 'placeholder',
        cron: '20'
      }
    });
    noMinuteWrapper.trigger('click');
  });
});
