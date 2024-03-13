import { describe, expect, it, vi } from 'vitest';
import { actionSheet } from '../actionSheet';

describe('weui-action-sheet-fn', () => {
  it('actionSheet api mount', () => {
    const menus = [{ label: '菜单1' }, { label: '菜单1' }];
    const actions = [{ label: '取消' }];
    const fn = vi.fn();
    const result = actionSheet({
      title: '标题',
      actions,
      menus,
      onClose: fn
    });
    expect(typeof result).toBe('function');
    expect(result()).toBe(undefined);
    expect(fn).toHaveBeenCalled();
  });
});
