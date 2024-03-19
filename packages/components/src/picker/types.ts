export interface PickerItem<T = any> {
  label: string;
  value: T;
  disabled?: boolean;
  children?: PickerItem<T>[];
}
