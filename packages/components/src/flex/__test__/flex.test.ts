import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Flex from '../flex.vue';
import FlexItem from '../flexItem.vue';

describe('weui-flex', () => {
  it('render flex slot', () => {
    const flexText = 'Flex';
    const wrapper = mount(Flex, {
      slots: {
        default: flexText
      }
    });
    expect(wrapper.text()).toBe(flexText);
  });
  it('render flex gap', () => {
    const wrapperNumber = mount(Flex, {
      props: {
        gap: 20
      }
    });
    expect((wrapperNumber.element as HTMLElement).style.gap).toBe('20px');
    const wrapperTuple = mount(Flex, {
      props: {
        gap: [10, 20]
      }
    });
    expect((wrapperTuple.element as HTMLElement).style.gap).toBe('10px 20px');
  });
});

describe('weui-flex-item', () => {
  it('render flex-item slot', () => {
    const flexText = 'Flex-item';
    const wrapper = mount(FlexItem, {
      slots: {
        default: flexText
      }
    });
    expect(wrapper.text()).toBe(flexText);
  });
  it('render flex-item flex', () => {
    const wrapper = mount(FlexItem, {
      props: {
        flex: 2
      }
    });
    expect((wrapper.element as HTMLElement).style.flex).toBe('2 1 0%');
  });
});
