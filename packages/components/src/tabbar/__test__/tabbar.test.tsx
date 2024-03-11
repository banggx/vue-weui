import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TabBar from '../tabbar.vue';
import TabBarItem from '../tabbarItem.vue';

describe('weui-tabbar', () => {
  it('render tabbar', () => {
    const modelTab = 'tab1';
    const tabs = [
      { label: 'tab1', value: 'tab1' },
      { label: 'tab2', value: 'tab2' }
    ];
    const changeHandler = vi.fn();
    const wrapper = mount(
      <TabBar modelValue={modelTab} onChange={changeHandler}>
        {tabs.map((item) => (
          <TabBarItem label={item.label} value={item.value}></TabBarItem>
        ))}
      </TabBar>
    );
    nextTick(async () => {
      await wrapper.findAll('.weui-tabbar__item')[0].trigger('click');
      expect(changeHandler).toBeCalled();
    });
  });

  it('render tabbar tab slot', () => {
    const modelTab = 'tab1';
    const tabs = [
      { label: 'tab1', value: 'tab1' },
      { label: 'tab2', value: 'tab2' }
    ];
    const changeHandler = vi.fn();
    mount(
      <TabBar modelValue={modelTab} onChange={changeHandler}>
        {{
          tab: () => <div>tab</div>
        }}
        {tabs.map((item) => (
          <TabBarItem label={item.label} value={item.value}></TabBarItem>
        ))}
      </TabBar>
    );
  });
});
