import { describe, expect, it, vi } from 'vitest';
import { alert } from '../alert';

const sleep = (duration: number) =>
  new Promise((resolve) => setTimeout(resolve, duration));
describe('weui-alert-fn', () => {
  it('alert api mount', () => {
    const text = 'alert text';
    const fn = vi.fn();
    const result = alert({
      text,
      showClose: true,
      showIcon: true,
      type: 'warn-primary',
      onClose: fn,
      duration: 0
    });
    expect(typeof result).toBe('function');
    expect(result()).toBe(undefined);
    expect(fn).toHaveBeenCalled();
  });

  it('alert timeout unmount', async () => {
    const text = 'alert text';
    const fn = vi.fn();
    alert({
      text,
      showClose: true,
      showIcon: true,
      type: 'warn-primary',
      onClose: fn,
      duration: 200
    });
    await sleep(200);
    expect(fn).toHaveBeenCalled();
  });
});
