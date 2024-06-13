import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Textarea from '../textarea.vue';

describe('weui-textarea', () => {
  it('render textarea', () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'input',
        placeholder: 'placeholder',
        disabled: true
      }
    });
    expect(wrapper.find('.weui-textarea').attributes().placeholder).toBe(
      'placeholder'
    );
    expect(wrapper.find('.weui-textarea').attributes()).toHaveProperty(
      'disabled'
    );
    expect(wrapper.classes()).toContain('weui-cell_disabled');
  });

  it('change textarea value', () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'input',
        placeholder: 'placeholder',
        type: 'text'
      }
    });
    wrapper.find('.weui-textarea').setValue('new input');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('change');
  });

  it('show textarea number', async () => {
    const wrapper = mount(Textarea, {
      props: {
        modelValue: 'input',
        placeholder: 'placeholder',
        maxlength: 10,
        showNum: true
      }
    });
    wrapper.find('weui-textarea-counter').exists();
  });
});
