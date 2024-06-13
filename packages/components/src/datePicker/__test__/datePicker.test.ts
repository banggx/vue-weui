import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import DatePicker from '../datePicker.vue';
import dayjs from 'dayjs';

describe('weui-date-picker', () => {
  it('render datePicker', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: undefined,
        placeholder: 'placeholder',
        start: new Date('2021-1-1'),
        end: new Date('2025-1-1')
      }
    });
    expect(wrapper.find('.weui-date-value').text()).toBe('placeholder');

    // 触发打开选择器
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(document.querySelector('.weui-date-picker-selector')).not.toBeNull();

    // 触发picker事件
    const pickerGroup = document.querySelector(
      '.weui-date-picker-selector .weui-picker__group'
    );
    if (pickerGroup) {
      pickerGroup.scrollTop = 56;
      pickerGroup.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('selectChange');
      // 触发confirm事件
      const confirmBtn = document.querySelector(
        '.weui-date-picker-selector .weui-picker__btn'
      );
      confirmBtn?.dispatchEvent(new Event('click'));
      expect(wrapper.emitted()).toHaveProperty('change');
      expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    }
  });

  it('render datePicker disabled', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: new Date(),
        placeholder: 'placeholder',
        disabled: true
      }
    });
    expect(wrapper.find('.weui-date-value').text()).toBe(
      dayjs().format('YYYY-MM-DD')
    );
    expect(wrapper.classes()).toContain('weui-picker_diabled');

    wrapper.trigger('click');
  });

  it('render datePicker formatter', async () => {
    const wrapper = mount(DatePicker, {
      props: {
        modelValue: new Date(),
        placeholder: 'placeholder',
        formatter: 'YYYY年MM月DD日'
      }
    });
    expect(wrapper.find('.weui-date-value').text()).toBe(
      dayjs().format('YYYY年MM月DD日')
    );
  });
});
