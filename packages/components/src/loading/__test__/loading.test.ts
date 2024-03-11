import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Loading from '../loading.vue';

describe('weui-loading', () => {
  it('render loading type', () => {
    const wrapper = mount(Loading, {
      props: {
        type: 'primary'
      }
    });
    expect(wrapper.classes()).toContain('weui-loading-primary');
  });
});
