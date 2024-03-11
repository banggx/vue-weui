import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import NavBar from '../navbar.vue';
import NavBarItem from '../navbarItem.vue';

describe('weui-navbar', () => {
  it('render navbar', () => {
    const modelTab = 'tab1';
    const tabs = [
      { label: 'tab1', value: 'tab1' },
      { label: 'tab2', value: 'tab2' }
    ];
    const changeHandler = vi.fn();
    const wrapper = mount(
      <NavBar modelValue={modelTab} onChange={changeHandler}>
        {tabs.map((item) => (
          <NavBarItem title={item.label} value={item.value}></NavBarItem>
        ))}
      </NavBar>
    );
    nextTick(async () => {
      await wrapper.findAll('.weui-navbar__item')[0].trigger('click');
      expect(changeHandler).toBeCalled();
    });
  });
});
