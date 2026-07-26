import { watch, onUnmounted, isRef, type Ref } from 'vue';

interface SwipeOptions {
  threshold?: number; // 触发滑动的最小距离阈值
  onSwipeStart?: (e: TouchEvent) => void;
  onSwipeMove?: (e: TouchEvent, deltaX: number, deltaY: number) => void;
  onSwipeEnd?: (
    e: TouchEvent,
    direction: 'left' | 'right' | 'up' | 'down',
    distance: number
  ) => void;
}

/**
 * useSwipe - 滑动手势检测
 * 支持两种入参形式：
 * 1. Ref<HTMLElement | null> - 自动监听 ref 变化绑定/解绑事件
 * 2. HTMLElement - 直接绑定到元素
 */
export function useSwipe(
  elementRef: Ref<HTMLElement | null> | HTMLElement,
  options: SwipeOptions = {}
) {
  const { threshold = 30, onSwipeStart, onSwipeMove, onSwipeEnd } = options;

  let startX = 0;
  let startY = 0;
  let isSwiping = false;
  let boundElement: HTMLElement | null = null;

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length !== 1) return;

    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isSwiping = true;

    if (onSwipeStart) {
      onSwipeStart(e);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isSwiping || e.touches.length !== 1) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;

    if (onSwipeMove) {
      onSwipeMove(e, deltaX, deltaY);
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isSwiping || e.changedTouches.length !== 1) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    let direction: 'left' | 'right' | 'up' | 'down' = 'right';
    let distance = 0;

    // 判断主要滑动方向（水平或垂直）
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // 水平滑动
      if (deltaX > threshold) {
        direction = 'right';
        distance = deltaX;
      } else if (deltaX < -threshold) {
        direction = 'left';
        distance = Math.abs(deltaX);
      }
    } else {
      // 垂直滑动
      if (deltaY > threshold) {
        direction = 'down';
        distance = deltaY;
      } else if (deltaY < -threshold) {
        direction = 'up';
        distance = Math.abs(deltaY);
      }
    }

    if (onSwipeEnd && (direction === 'left' || direction === 'right')) {
      onSwipeEnd(e, direction, distance);
    }

    isSwiping = false;
  };

  const bindEvents = (el: HTMLElement) => {
    if (!el || boundElement === el) return;
    // 先解绑旧元素
    if (boundElement) {
      unbindEvents(boundElement);
    }
    el.addEventListener('touchstart', handleTouchStart, { passive: true });
    el.addEventListener('touchmove', handleTouchMove, { passive: true });
    el.addEventListener('touchend', handleTouchEnd, { passive: true });
    el.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    boundElement = el;
  };

  const unbindEvents = (el: HTMLElement) => {
    if (!el) return;
    el.removeEventListener('touchstart', handleTouchStart);
    el.removeEventListener('touchmove', handleTouchMove);
    el.removeEventListener('touchend', handleTouchEnd);
    el.removeEventListener('touchcancel', handleTouchEnd);
    if (boundElement === el) {
      boundElement = null;
    }
  };

  // 根据入参类型决定绑定方式
  if (isRef(elementRef)) {
    // Ref 形式：监听 ref 变化自动绑定/解绑
    watch(
      elementRef as Ref<HTMLElement | null>,
      (newEl, oldEl) => {
        if (oldEl) {
          unbindEvents(oldEl);
        }
        if (newEl) {
          bindEvents(newEl);
        }
      },
      { immediate: true }
    );
  } else if (elementRef instanceof HTMLElement) {
    // 直接传入 HTMLElement
    bindEvents(elementRef);
  }

  onUnmounted(() => {
    if (boundElement) {
      unbindEvents(boundElement);
    }
  });

  return {
    bindEvents: () => {
      if (isRef(elementRef) && elementRef.value) {
        bindEvents(elementRef.value);
      } else if (elementRef instanceof HTMLElement) {
        bindEvents(elementRef);
      }
    },
    unbindEvents: () => {
      if (boundElement) {
        unbindEvents(boundElement);
      }
    }
  };
}
