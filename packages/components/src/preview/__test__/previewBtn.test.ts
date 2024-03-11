import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import PreviewBtn from '../previewBtn.vue';

describe('weui-preview-btn', () => {
  it('render preview btn type', () => {
    const types = ['default', 'primary'];
    for (const type of types) {
      const wrapper = mount(PreviewBtn, {
        props: {
          type: type as any
        }
      });
      expect(wrapper.classes()).toContain(`weui-form-preview__btn_${type}`);
    }
  });

  it('render default slot', () => {
    const defaultSlot = 'default slot';
    const wrapper = mount(PreviewBtn, {
      slots: {
        default: defaultSlot
      }
    });
    expect(wrapper.text()).toBe(defaultSlot);
  });

  it('click event emit', async () => {
    const wrapper = mount(PreviewBtn, {
      slots: {
        default: 'button'
      }
    });
    await wrapper.trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
