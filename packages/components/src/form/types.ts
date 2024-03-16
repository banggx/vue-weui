import type {
  Values,
  RuleItem as _RuleItem,
  Rule as _Rule,
  Rules as _Rules
} from 'async-validator';

export type Rules = _Rules;
export type Rule = _Rule;
export type RuleItem = _RuleItem;
export interface FormInstance {
  validate: (nameList?: string[]) => Promise<Values>;
  resetFields: (nameList?: string[]) => void;
  clearValidate: (nameList?: string[]) => void;
}
