import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Form from '../form.vue';
import FormItem from '../formItem.vue';
import FormGroup from '../formGroup.vue';

describe('weui-form', () => {
  it('render form basic element', () => {
    const wrapper = mount(Form, {
      props: {
        title: 'title',
        desc: 'desc'
      },
      slots: {
        ft: 'ft',
        default: 'default'
      }
    });
    expect(wrapper.find('.weui-form__text-area .weui-form__title').text()).toBe(
      'title'
    );
    expect(wrapper.find('.weui-form__text-area .weui-form__desc').text()).toBe(
      'desc'
    );
    expect(wrapper.find('.weui-form__control-area').text()).toBe('default');
    expect(wrapper.find('.weui-form__ft').text()).toBe('ft');

    const slotHeaderWrapper = mount(Form, {
      slots: {
        title: 'slot title',
        desc: 'slot desc'
      }
    });
    expect(
      slotHeaderWrapper.find('.weui-form__text-area .weui-form__title').text()
    ).toBe('slot title');
    expect(
      slotHeaderWrapper.find('.weui-form__text-area .weui-form__desc').text()
    ).toBe('slot desc');
  });

  it('not render form header', () => {
    const wrapper = mount(Form, {});
    expect(wrapper.classes()).toContain('weui-form-noheader');
  });

  it('validate form', async () => {
    const modelData = { name: undefined };
    const rules = {
      name: {
        required: true,
        message: '必填项'
      }
    };
    const wrapper = mount(Form, {
      props: {
        model: modelData,
        rules: rules,
        validateAlert: '校验错误',
        validateShowWarn: true
      }
    });
    await expect((wrapper as any).vm.validate()).rejects.toThrow();
    await expect((wrapper as any).vm.validate(['name'])).rejects.toThrow();
    let error: any;
    try {
      await (wrapper as any).vm.validate([]);
    } catch (err) {
      error = err;
    }
    expect(error).toBeUndefined();
    expect(wrapper.emitted()).toHaveProperty('submit');

    /**
     * 测试自定义alert函数调用
     */
    const validateAlertFn = vi.fn();
    const alertFnwrapper = mount(Form, {
      props: {
        model: modelData,
        rules: rules,
        validateAlert: validateAlertFn
      }
    });
    await expect((alertFnwrapper as any).vm.validate()).rejects.toThrow();
    expect(validateAlertFn).toHaveBeenCalled();
  });

  it('reset feilds form', async () => {
    const rules = {
      name: {
        required: true,
        message: '必填项'
      }
    };
    const modelData = { name: undefined };
    const wrapper = mount(Form, {
      props: {
        model: modelData,
        rules: rules
      }
    });
    await expect((wrapper as any).vm.validate()).rejects.toThrow();
    await wrapper.setProps({ model: { name: 'name' } });
    (wrapper as any).vm.resetFields(['name']);
    expect(modelData.name).toBeUndefined();
    (wrapper as any).vm.resetFields();
  });

  it('clear feilds form', async () => {
    const modelData = { name: undefined };
    const rules = {
      name: {
        required: true,
        message: '必填项'
      }
    };
    const wrapper = mount(Form, {
      props: {
        model: modelData,
        rules: rules
      }
    });
    await expect((wrapper as any).vm.validate()).rejects.toThrow();
    expect(
      (wrapper.getCurrentComponent() as any).setupState.validateErrors
    ).toHaveProperty('name');
    (wrapper as any).vm.clearValidate(['name']);
    expect(
      (wrapper.getCurrentComponent() as any).setupState.validateErrors
    ).not.toHaveProperty('name');
    (wrapper as any).vm.clearValidate();
  });
});

describe('weui-form-with-formItem', () => {
  it('register form info', () => {
    const modelData = {};
    const nameRule = {
      required: true,
      message: '必填项'
    };
    const ageRule = [
      {
        required: true,
        message: '必填项'
      }
    ];
    const wrapper = mount(
      <Form model={modelData}>
        <FormItem name="name" rule={nameRule}></FormItem>
        <FormItem name="age" rule={ageRule}></FormItem>
      </Form>
    );
    expect(
      (wrapper.getCurrentComponent() as any).setupState.allNameList
    ).toContain('name');
    expect(
      (wrapper.getCurrentComponent() as any).setupState.allRules
    ).toHaveProperty('name');
  });

  it('remove validate error', async () => {
    const modelData: any = { name: undefined };
    const nameRule = {
      required: true,
      message: '必填项'
    };
    const wrapper = mount(
      <Form model={modelData.value}>
        <FormItem name="name" rule={nameRule}></FormItem>
      </Form>
    );
    await expect((wrapper as any).vm.validate()).rejects.toThrow();
    expect(
      (wrapper.getCurrentComponent() as any).setupState.validateErrors
    ).toHaveProperty('name');
    await wrapper.setProps({ model: { name: 'name' } });
    expect(
      (wrapper.getCurrentComponent() as any).setupState.validateErrors
    ).not.toHaveProperty('name');
  });

  it('render vertical form item', () => {
    const wrapper = mount(<FormItem name="name" vertical></FormItem>);
    expect(wrapper.classes()).toContain('weui-cell_vertical');
  });
});

describe('weui-form-group', () => {
  it('mount weui form group', () => {
    const wrapper = mount(FormGroup, {
      props: {
        title: 'group'
      }
    });
    expect(wrapper.find('.weui-cells__title').text()).toBe('group');
    const slotWrapper = mount(FormGroup, {
      slots: {
        title: 'slot group'
      }
    });
    expect(slotWrapper.find('.weui-cells__title').text()).toBe('slot group');
  });
});
