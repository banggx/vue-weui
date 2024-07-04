<template>
  <div class="weui-form" :class="classnames">
    <div class="weui-form__bd">
      <div
        v-if="title || desc || $slots['title'] || $slots['desc']"
        class="weui-form__text-area"
      >
        <h2 v-if="title || $slots['title']" class="weui-form__title">
          <slot v-if="$slots['title']" name="title"></slot>
          <template v-else>{{ title }}</template>
        </h2>
        <div v-if="desc || $slots['desc']" class="weui-form__desc">
          <slot v-if="$slots['desc']" name="desc"></slot>
          <template v-else>{{ desc }}</template>
        </div>
      </div>
      <div class="weui-form__control-area">
        <slot></slot>
      </div>
    </div>
    <div v-if="$slots['ft']" class="weui-form__ft">
      <slot name="ft"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRef, computed, provide, getCurrentInstance } from 'vue';
import Schema from 'async-validator';
import {
  REGISTER_NAME_LIST,
  REGISTER_RULE,
  VALIDATE_ERRORS,
  REMOVE_VALIDATE_ERROR,
  VALIDATE_SHOW_WARN,
  FORM_MODEL_DATA
} from './constants';
import merge from 'lodash/merge';
import pick from 'lodash/pick';
import { default as setObject } from 'lodash/set';
import { default as getObject } from 'lodash/get';
import { alert } from '../alert/alert';
import type { Rules, Rule, RuleItem, ValidateError } from 'async-validator';
import './form.less';

defineOptions({
  name: 'weui-form'
});
const props = withDefaults(
  defineProps<{
    title?: string;
    desc?: string;
    model?: Record<string, any>;
    rules?: Rules;
    validateToAlert?: boolean;
    validateAlert?: string | ((errors: ValidateError[]) => string);
    validateShowWarn?: boolean;
  }>(),
  {
    model: () => ({}),
    rules: () => ({}),
    validateToAlert: true,
    validateShowWarn: false
  }
);
const emit = defineEmits<{
  (type: 'submit', values: Record<string, any>): void;
}>();
const instance = getCurrentInstance();
const modelData = toRef(props, 'model');
const validateShowWarn = toRef(props, 'validateShowWarn');
const allNameList = ref<string[]>([]);
const flexibleRules = ref<Record<string, RuleItem[]>>({});
const validateErrors = ref<Record<string, ValidateError> | null>(null);
const allRules = computed(() => merge(props.rules, flexibleRules.value));
const classnames = computed(() => ({
  'weui-form-noheader':
    !props.title &&
    !props.desc &&
    !instance?.slots['title'] &&
    !instance?.slots['desc']
}));

const registerNameList = (name: string) => {
  !allNameList.value.includes(name) && allNameList.value.push(name);
};
const registerRules = (name: string, rule: Rule) => {
  const formatRule = Array.isArray(rule) ? rule : [rule];
  /**
   * 不合并注册规则，直接覆盖
   * 正常情况，一个form表单内部只应该存在一个唯一的name表单项
   */
  flexibleRules.value[name] = formatRule;
};
const removeValidateError = (name: string) => {
  if (validateErrors.value && name in validateErrors.value) {
    delete validateErrors.value[name];
  }
};
provide(REGISTER_NAME_LIST, registerNameList);
provide(REGISTER_RULE, registerRules);
provide(VALIDATE_ERRORS, validateErrors);
provide(REMOVE_VALIDATE_ERROR, removeValidateError);
provide(FORM_MODEL_DATA, modelData);
provide(VALIDATE_SHOW_WARN, validateShowWarn);

const validateForm = (nameList?: string[]) => {
  const validateData = nameList
    ? pick(modelData.value, nameList)
    : modelData.value;
  let validateRules: Rules = allRules.value;
  /**
   * 只校验部分数据，搜集这部分数据的校验规则
   */
  if (nameList) {
    validateRules = nameList.reduce<Rules>((map, name) => {
      const rule = getObject(allRules.value, name);
      if (rule) {
        setObject(map, name, rule);
      }
      return map;
    }, {});
  }
  const validator = new Schema(validateRules);
  return validator.validate(validateData, (errors) => {
    validateErrors.value = errors
      ? errors.reduce<Record<string, ValidateError>>((map, item) => {
          if (item.field) {
            map[item.field] = item;
          }
          return map;
        }, {})
      : null;
    if (props.validateToAlert && errors) {
      let alertMessage = errors[0].message;
      if (props.validateAlert) {
        alertMessage =
          typeof props.validateAlert === 'string'
            ? props.validateAlert
            : props.validateAlert(errors);
      }
      alert({
        type: 'warn-primary',
        text: alertMessage!
      });
    }
    if (!errors) {
      emit('submit', modelData.value);
    }
  });
};
const resetFields = (nameList?: string[]) => {
  const resetNames = nameList || allNameList.value;
  resetNames.map((name) => {
    if (validateErrors.value && name in validateErrors.value) {
      delete validateErrors.value[name];
    }
    setObject(modelData.value, name, undefined);
  });
};
const clearValidate = (nameList?: string[]) => {
  const resetNames = nameList || allNameList.value;
  resetNames.map((name) => {
    if (validateErrors.value && name in validateErrors.value) {
      delete validateErrors.value[name];
    }
  });
};

defineExpose<{
  validate: typeof validateForm;
  resetFields: typeof resetFields;
  clearValidate: typeof clearValidate;
}>({
  validate: validateForm,
  resetFields: resetFields,
  clearValidate: clearValidate
});
</script>
