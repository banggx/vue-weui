<template>
  <label for="js_input1" class="weui-cell weui-cell_active" :class="classnames">
    <div class="weui-cell__hd">
      <span class="weui-label">
        <slot v-if="$slots['label']" name="label"></slot>
        <template v-else>{{ label }}</template>
      </span>
    </div>
    <div class="weui-cell__bd weui-flex">
      <slot></slot>
    </div>
  </label>
</template>

<script lang="ts" setup>
import { inject, onBeforeMount, computed, watch } from 'vue';
import {
  REGISTER_NAME_LIST,
  REGISTER_RULE,
  VALIDATE_ERRORS,
  REMOVE_VALIDATE_ERROR,
  FORM_MODEL_DATA
} from './constants';
import { default as getObject } from 'lodash/get';
import type { Rule, ValidateError } from 'async-validator';
import type { ShallowRef } from 'vue';

defineOptions({
  name: 'weui-form-item'
});
const props = withDefaults(
  defineProps<{
    name: string;
    label?: string;
    rule?: Rule;
    vertical?: boolean;
  }>(),
  {
    vertical: false
  }
);
const registerNameList = inject<(name: string) => void>(REGISTER_NAME_LIST);
const registerRules = inject<(name: string, rule: Rule) => void>(REGISTER_RULE);
const validatorErrors =
  inject<ShallowRef<Record<string, ValidateError> | null>>(VALIDATE_ERRORS);
const removeValidateError = inject<(name: string) => void>(
  REMOVE_VALIDATE_ERROR
);
const formData = inject<ShallowRef<Record<string, any>>>(FORM_MODEL_DATA);

const currentErrors = computed(() => validatorErrors?.value?.[props.name]);
const classnames = computed(() => ({
  'weui-cell_warn': currentErrors.value,
  'weui-cell_vertical': props.vertical
}));
const currentFormData = computed(() => getObject(formData?.value, props.name));

watch(currentFormData, () => {
  if (currentErrors.value && removeValidateError) {
    removeValidateError(props.name);
  }
});
onBeforeMount(() => {
  if (registerNameList) {
    registerNameList(props.name);
  }
  if (props.rule && registerRules) {
    registerRules(props.name, props.rule);
  }
});
</script>
