export type ActionSheetMenuOrActions<T = any> = T & {
  label: string;
  classNames?: string;
  [key: string]: any;
};
