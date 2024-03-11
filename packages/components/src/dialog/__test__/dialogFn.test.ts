import { describe, expect, it, vi } from 'vitest';
import { dialog } from '../dialog';

describe('weui-dialog-fn', () => {
  it('actionSheet api mount', () => {
    const cancelFn = vi.fn();
    const okFn = vi.fn();
    const result = dialog({
      title: '标题',
      desc: '描述',
      onCancel: cancelFn,
      onOk: okFn
    });
    expect(typeof result).toBe('function');
    expect(result()).toBe(undefined);
  });
});
