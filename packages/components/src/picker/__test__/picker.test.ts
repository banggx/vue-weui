import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Picker from '../picker.vue';

describe('weui-picker', () => {
  it('render picker', async () => {
    const pickerOptions = [
      { label: 'label1', value: 1 },
      { label: 'label2', value: 2 }
    ];
    const wrapper = mount(Picker, {
      props: {
        modelValue: undefined,
        placeholder: 'placeholder',
        options: pickerOptions
      }
    });
    expect(wrapper.find('.weui-picker-value').text()).toBe('placeholder');

    // 触发打开选择器
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(document.querySelector('.weui-picker-selector')).not.toBeNull();

    // 触发picker事件
    const pickerGroup = document.querySelector(
      '.weui-picker-selector .weui-picker__group'
    );
    if (pickerGroup) {
      pickerGroup.scrollTop = 56;
      pickerGroup.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted()).toHaveProperty('selectChange');
      // 触发confirm事件
      const confirmBtn = document.querySelector(
        '.weui-picker-selector .weui-picker__btn'
      );
      confirmBtn?.dispatchEvent(new Event('click'));
      expect(wrapper.emitted()).toHaveProperty('change');
    }
    wrapper.unmount();
  });

  it('render picker disabled', async () => {
    const pickerOptions = [
      { label: 'label1', value: 1 },
      { label: 'label2', value: 2 }
    ];
    const wrapper = mount(Picker, {
      props: {
        modelValue: 2,
        placeholder: 'placeholder',
        options: pickerOptions,
        disabled: true
      }
    });
    expect(wrapper.find('.weui-picker-value').text()).toBe('label2');
    expect(wrapper.classes()).toContain('weui-picker_diabled');

    wrapper.trigger('click');
  });

  it('render multi picker', async () => {
    const pickerOptions = [
      { label: 'label1', value: 1, children: [{ label: 'child1', value: 3 }] },
      { label: 'label2', value: 2, children: [{ label: 'child1', value: 4 }] }
    ];
    const wrapper = mount(Picker, {
      props: {
        modelValue: [1, 3],
        placeholder: 'placeholder',
        options: pickerOptions,
        isMulti: true
      }
    });
    expect(wrapper.find('.weui-picker-value').text()).toBe('label1/child1');
    wrapper.trigger('click');
    await wrapper.vm.$nextTick();
    expect(document.querySelector('.weui-picker-selector')).not.toBeNull();
    const pickerGroup = document.querySelector(
      '.weui-picker-selector .weui-picker__group'
    );
    if (pickerGroup) {
      pickerGroup.scrollTop = 56;
      pickerGroup.dispatchEvent(new Event('scroll'));
      await wrapper.vm.$nextTick();
      // 触发confirm事件
      const confirmBtn = document.querySelector(
        '.weui-picker-selector .weui-picker__btn'
      );
      confirmBtn?.dispatchEvent(new Event('click'));
    }
  });

  it('render array multi picker', async () => {
    const pickerOptions = [
      [
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 }
      ],
      [
        { label: 'child1', value: 3 },
        { label: 'child1', value: 4 }
      ]
    ];
    const wrapper = mount(Picker, {
      props: {
        modelValue: [1, 5],
        placeholder: 'placeholder',
        options: pickerOptions,
        isMulti: true
      }
    });
    expect(wrapper.find('.weui-picker-value').text()).toBe('label1');
  });

  it('render single picker with array options', async () => {
    const pickerOptions = [
      [
        { label: 'label1', value: 1 },
        { label: 'label2', value: 2 }
      ],
      [
        { label: 'child1', value: 3 },
        { label: 'child1', value: 4 }
      ]
    ];
    const wrapper = mount(Picker, {
      props: {
        modelValue: 1,
        placeholder: 'placeholder',
        options: pickerOptions,
        isMulti: false
      }
    });
    expect(wrapper.find('.weui-picker-value').text()).toBe('label1');
    wrapper.trigger('click');
  });
});
