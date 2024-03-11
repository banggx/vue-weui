import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Badge from '../badge.vue';

describe('weui-badge', () => {
  it('render value content', () => {
    const wrapper = mount(Badge, {
      props: {
        value: '50'
      }
    });
    expect(wrapper.find('#b1_n1').text()).toBe('50');
  });

  it('render value max handle', async () => {
    const wrapperMin = mount(Badge, {
      props: {
        value: 49,
        max: 49
      }
    });
    expect(wrapperMin.find('#b1_n1').text()).toBe('49');
    const wrapperMax = mount(Badge, {
      props: {
        value: 50,
        max: 49
      }
    });
    expect(wrapperMax.find('#b1_n1').text()).toBe('49+');
  });

  it('render string value max handle', () => {
    const wrapper = mount(Badge, {
      props: {
        value: '50',
        max: 49
      }
    });
    expect(wrapper.find('#b1_n1').text()).toBe('50');
  });

  it('render value dot', () => {
    const wrapper = mount(Badge, {
      props: {
        dot: true,
        value: 50
      }
    });
    expect(wrapper.find('#b1_n1').classes()).toContain('weui-badge_dot');
  });

  it('custom render value', () => {
    const wrapper = mount(Badge, {
      slots: {
        default: 'custom'
      }
    });
    expect(wrapper.find('#b1_n1').text()).toBe('custom');
  });

  it('custom render content', () => {
    const wrapper = mount(Badge, {
      slots: {
        content: 'content'
      }
    });
    expect(wrapper.classes()).toContain('weui-badge-content');
    expect(wrapper.text()).toBe('content');
  });
});
