import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Steps from '../steps.vue';
import StepItem from '../stepItem.vue';

describe('weui-steps', () => {
  it('render direction props', () => {
    const directions = ['vertical', 'horizontal'];
    for (const dir of directions) {
      const wrapper = mount(Steps, {
        props: {
          direction: dir as any
        }
      });
      if (dir === 'vertical') {
        expect(wrapper.classes()).toContain('weui-steps_vertical');
      }
      if (dir === 'horizontal') {
        expect(wrapper.classes()).toContain('weui-steps_horizonal');
      }
    }
  });

  it('render default slot', () => {
    const defaultSlot = 'defaultSlot';
    const wrapper = mount(Steps, {
      slots: {
        default: defaultSlot
      }
    });
    expect(wrapper.text()).toBe(defaultSlot);
  });

  it('render step item slot', () => {
    const activeStep = 1;
    const changeHandler = vi.fn();
    const wrapper = mount(() => (
      <Steps modelValue={activeStep} onChange={changeHandler}>
        <StepItem step={0}></StepItem>
        <StepItem step={1}></StepItem>
        <StepItem step={2}></StepItem>
      </Steps>
    ));
    wrapper.findAll('.weui-steps__item').forEach((ele, index) => {
      if (index < activeStep) {
        expect(ele.classes()).toContain('weui-steps__item_success');
      }
    });
    wrapper.findAll('.weui-steps__item')[2].trigger('click');
    expect(changeHandler).toBeCalled();
  });

  it('render step direction with horizontal', () => {
    const activeStep = 1;
    const wrapper = mount(() => (
      <Steps modelValue={activeStep} direction="horizontal">
        <StepItem step={0}></StepItem>
        <StepItem step={1}></StepItem>
        <StepItem step={2}></StepItem>
      </Steps>
    ));
    wrapper.findAll('.weui-steps__item').forEach((ele) => {
      expect(ele.find('.weui-steps__item__inner').attributes().style).toBe(
        'display: none;'
      );
    });
  });

  it('render steps item icons', () => {
    const activeStep = 1;
    const wrapper = mount(() => (
      <Steps modelValue={activeStep}>
        <StepItem step={0}></StepItem>
        <StepItem step={1} icon="waiting"></StepItem>
        <StepItem step={2}></StepItem>
      </Steps>
    ));
    expect(wrapper.findAll('.weui-steps__item')[1].classes()).toContain(
      'weui-steps__item_icon-prev'
    );
  });
});
