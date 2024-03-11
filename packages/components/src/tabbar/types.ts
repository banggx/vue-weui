export interface TabBarItem<T = any> {
  label: string;
  value: T;
  icon: string;
  [key: string]: any;
}
