import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Progress from '../progress.vue';

describe('weui-progress', () => {
  it('render progress count', () => {
    const wrapper = mount(Progress, {
      props: {
        count: 50
      }
    });
    expect(
      (wrapper.find('.weui-progress__inner-bar').element as HTMLElement).style
        .width
    ).toBe('50%');
  });

  it('render progress close btn', async () => {
    const wrapper = mount(Progress, {
      props: {
        count: 50,
        showClose: true
      }
    });
    expect(wrapper.find('.weui-progress__opr').exists()).toBe(true);
    await wrapper.find('.weui-progress__opr').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });

  it('should render solt', () => {
    const wrapper = mount(Progress, {
      slots: {
        extra: '50%'
      }
    });
    expect(wrapper.find('.weui-progress-extra-wrapper').text()).toContain(
      '50%'
    );
  });
});
