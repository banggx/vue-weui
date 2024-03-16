import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from '../input.vue';

describe('weui-input', () => {
  it('render input', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'input',
        placeholder: 'placeholder',
        type: 'text',
        allowClear: true,
        disabled: true
      }
    });
    expect(wrapper.find('.weui-input').attributes().type).toBe('text');
    expect(wrapper.find('.weui-input').attributes().placeholder).toBe(
      'placeholder'
    );
    expect(wrapper.find('.weui-input').attributes()).toHaveProperty('disabled');
    expect(wrapper.find('.weui-btn_reset').exists()).toBe(true);
    expect(wrapper.classes()).toContain('weui-cell_disabled');
  });

  it('change input value', () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'input',
        placeholder: 'placeholder',
        type: 'text'
      }
    });
    wrapper.find('.weui-input').setValue('new input');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('change');
  });

  it('clear input value', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'input',
        placeholder: 'placeholder',
        type: 'text',
        allowClear: true
      }
    });
    await wrapper.find('.weui-btn_reset').trigger('click');
    expect((wrapper.emitted().change[0] as any)?.[0]).toBe('');
  });
});
