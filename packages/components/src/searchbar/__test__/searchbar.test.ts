import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../searchbar.vue';

describe('weui-searchbar', () => {
  it('render searchbar count', () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'search'
      }
    });
    expect(
      (wrapper.find('.weui-search-bar__input').element as HTMLInputElement)
        .value
    ).toBe('search');
  });

  it('render searchbar clear', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'search'
      }
    });
    await wrapper.find('.weui-icon-clear').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('update:modelValue');
    expect((wrapper.emitted()['update:modelValue'][0] as string[])[0]).toBe('');
  });

  it('render searchbar search event', async () => {
    const wrapper = mount(SearchBar, {
      props: {
        modelValue: 'search'
      }
    });
    await wrapper.find('.weui-search-bar__label span').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('search');
    expect((wrapper.emitted()['search'][0] as string[])[0]).toBe('search');
  });
});
