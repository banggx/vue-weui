import { describe, expect, it } from 'vitest';
import { toast } from '../toast';

describe('weui-toast', () => {
  it('toast api mount', () => {
    const result = toast({
      type: 'success',
      duration: 2000
    });
    expect(typeof result).toBe('function');
    expect(result()).toBe(undefined);

    const result1 = toast({
      type: 'success',
      duration: 0
    });
    expect(typeof result1).toBe('function');
  });
});
