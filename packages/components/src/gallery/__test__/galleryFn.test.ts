import { describe, expect, it, vi } from 'vitest';
import { gallery } from '../gallery';
import userEvent from '@testing-library/user-event';

describe('weui-gallery function', () => {
  it('gallery api mount', async () => {
    const deleteFn = vi.fn();
    const closeFn = vi.fn();
    const changeFn = vi.fn();
    const close = gallery({
      current: 0,
      urls: ['test1.jpg', 'test2.jpg', 'test3.jpg'],
      onDelete: deleteFn,
      onClose: closeFn,
      onChange: changeFn
    });

    const wrapper = document.body.querySelector(
      '.weui-gallery__teleport-container'
    );
    const deleteBtn = wrapper?.querySelector('.weui-gallery__del');
    deleteBtn && (await userEvent.click(deleteBtn));
    expect(deleteFn).toBeCalled();

    const closeBtn = wrapper?.querySelector('.gallery-close__btn');
    closeBtn && (await userEvent.click(closeBtn));
    expect(closeFn).toBeCalled();

    const threshold = window.innerWidth / 3;
    const imageWrap = wrapper?.querySelector('.weui-gallery__img-wrap');
    imageWrap?.dispatchEvent(
      new TouchEvent('touchstart', {
        changedTouches: [{ clientX: 50 + threshold + 20, clientY: 100 } as any]
      })
    );
    imageWrap?.dispatchEvent(
      new TouchEvent('touchmove', {
        changedTouches: [{ clientX: 50, clientY: 100 } as any]
      })
    );
    imageWrap?.dispatchEvent(
      new TouchEvent('touchend', {
        changedTouches: [{ clientX: 50, clientY: 100 } as any]
      })
    );
    expect(changeFn).toBeCalled();
    expect(close()).toBe(undefined);
  });
});
