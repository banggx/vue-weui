import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ActionSheet from '../actionsheet.vue';

describe('weui-action-sheet', () => {
  it('render actionsheet props', () => {
    const title = '标题';
    const menus = [{ label: '菜单1' }, { label: '菜单1' }];
    const actions = [{ label: '取消' }];
    const wrapper = mount(ActionSheet, {
      props: {
        modelValue: true,
        title,
        menus,
        actions
      }
    });
    expect(wrapper.find('.weui-actionsheet__title').text()).toBe(title);
    expect(
      wrapper.findAll('.weui-actionsheet__menu .weui-actionsheet__cell').length
    ).toBe(menus.length);
    wrapper
      .findAll('.weui-actionsheet__menu .weui-actionsheet__cell')
      .forEach((item, index) => {
        expect(item.text()).toBe(menus[index].label);
      });
    expect(wrapper.find('.weui-actionsheet__action').exists()).toBe(true);
    expect(
      wrapper.findAll('.weui-actionsheet__action .weui-actionsheet__cell')
        .length
    ).toBe(actions.length);
    wrapper
      .findAll('.weui-actionsheet__action .weui-actionsheet__cell')
      .forEach((item, index) => {
        expect(item.text()).toBe(actions[index].label);
      });
  });

  it('render title slot', () => {
    const titleSlot = 'titleSlot';
    const wrapper = mount(ActionSheet, {
      props: {
        modelValue: true
      },
      slots: {
        title: titleSlot
      }
    });
    expect(wrapper.find('.weui-actionsheet__title').text()).toBe(titleSlot);
  });

  it('render menus slot', () => {
    const menus = [{ label: '菜单1' }, { label: '菜单1' }];
    const extra = 'extra-text';
    const slots = {
      menu: ({ menu }: any) => (
        <div>
          {menu.label}
          {extra}
        </div>
      )
    };
    const wrapper = mount(() => {
      return (
        <ActionSheet
          modelValue={true}
          menus={menus}
          v-slots={slots}
        ></ActionSheet>
      );
    });
    wrapper
      .findAll('.weui-actionsheet__menu .weui-actionsheet__cell')
      .forEach((item, index) => {
        expect(item.text()).toBe(menus[index].label + extra);
      });
  });

  it('render actions slot', () => {
    const actions = [{ label: '取消' }];
    const extra = 'extra-text';
    const slots = {
      action: ({ action }: any) => (
        <div>
          {action.label}
          {extra}
        </div>
      )
    };
    const wrapper = mount(() => {
      return (
        <ActionSheet
          modelValue={true}
          actions={actions}
          v-slots={slots}
        ></ActionSheet>
      );
    });
    wrapper
      .findAll('.weui-actionsheet__action .weui-actionsheet__cell')
      .forEach((item, index) => {
        expect(item.text()).toBe(actions[index].label + extra);
      });
  });

  it('render click item', () => {
    const menus = [{ label: '菜单1' }, { label: '菜单1' }];
    const actions = [{ label: '取消' }];
    const wrapper = mount(() => {
      return (
        <ActionSheet
          modelValue={true}
          actions={actions}
          menus={menus}
        ></ActionSheet>
      );
    });
    wrapper.findAll('.weui-actionsheet__cell').forEach(async (item) => {
      await item.trigger('click');
      expect(wrapper.emitted()).toHaveProperty('click');
    });
  });

  it('render mask close', async () => {
    const wrapper = mount(() => {
      return <ActionSheet modelValue={true}></ActionSheet>;
    });
    await wrapper.find('.weui-mask').trigger('click');
  });

  it('render not visible', async () => {
    const wrapper = mount(() => {
      return <ActionSheet modelValue={false}></ActionSheet>;
    });
    expect(wrapper.find('.weui-mask').exists()).toBe(false);
    expect(wrapper.find('.weui-actionsheet').exists()).toBe(false);
  });
});
