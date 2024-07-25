/**
 * 管理所有picker实例，提供外部统一控制picker的显示和隐藏
 */

interface PickerInstance {
  hide: () => void;
}

const pickerMap = new Map<HTMLElement & PickerInstance, boolean>();
export function registerPicker(picker: HTMLElement & PickerInstance) {
  pickerMap.set(picker, true);
}

export function unregisterPicker(picker: HTMLElement & PickerInstance) {
  pickerMap.delete(picker);
}

export function closeAllPicker() {
  for (const [picker] of pickerMap.entries()) {
    picker.hide?.();
  }
  pickerMap.clear();
}

export function getAllPicker() {
  return pickerMap;
}
