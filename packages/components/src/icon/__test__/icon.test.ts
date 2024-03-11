import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Icon from '../icon.vue';

describe('weui-loading', () => {
  it('render icon type', () => {
    const icons = [
      'success',
      'info',
      'waiting',
      'warn',
      'success-no-circle',
      'close',
      'close-thin',
      'slide-down',
      'arrow',
      'outlined-warn'
    ];
    for (const icon in icons) {
      const wrapper = mount(Icon, {
        props: {
          type: icon as any
        }
      });
      expect(wrapper.classes()).toContain(`weui-icon-${icon}`);
    }
  });

  it('render icon size', () => {
    const wrapperNum = mount(Icon, {
      props: {
        type: 'success',
        size: 20
      }
    });
    expect(wrapperNum.attributes().style).toBe('font-size: 20px;');
    const wrapperStr = mount(Icon, {
      props: {
        type: 'success',
        size: '2em'
      }
    });
    expect(wrapperStr.attributes().style).toBe('font-size: 2em;');
  });
});
