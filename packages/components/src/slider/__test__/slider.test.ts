import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Slider from '../slider.vue';
import { nextTick } from 'vue';

describe('weui-slider', () => {
  it('render slider percent', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50
      }
    });
    expect(
      (wrapper.find('#sliderTrack').element as HTMLElement).style.width
    ).toBe('50%');
    expect(
      (wrapper.find('#sliderHandler').element as HTMLElement).style.left
    ).toBe('50%');
  });

  it('render slider number', () => {
    const wrapper = mount(Slider, {
      props: {
        modelValue: 50,
        showNum: true
      }
    });
    expect(wrapper.find('#sliderValue').text()).toBe('50');
  });
});
