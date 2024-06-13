import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Switch from '../switch.vue';

describe('weui-switch', () => {
  it('render switch', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: true
      }
    });
    expect(
      (wrapper.find('.weui-switch-cp__input').element as HTMLInputElement)
        .checked
    ).toBe(true);
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect(wrapper.emitted()).toHaveProperty('change');
    expect((wrapper.emitted().change[0] as any)[0]).toBe(false);
  });

  it('render switch disabled', async () => {
    const wrapper = mount(Switch, {
      props: {
        modelValue: false,
        disabled: true
      }
    });
    expect(wrapper.classes()).toContain('weui-cell_disabled');
    await wrapper.trigger('click');
    expect(wrapper.emitted().change).toBeUndefined();
  });
});
