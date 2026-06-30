import { ref, onMounted, onUnmounted } from 'vue';

interface SwipeOptions {
  threshold?: number; // 触发滑动的最小距离阈值
  onSwipeStart?: (e: TouchEvent) => void;
  onSwipeMove?: (e: TouchEvent, deltaX: number, deltaY: number) => void;
  onSwipeEnd?: (e: TouchEvent, direction: 'left' | 'right' | 'up' | 'down', distance: number) => void;
}

export function useSwipe(elementRef: HTMLElement | null, options: SwipeOptions = {}) {
  const { threshold = 30, onSwipeStart, onSwipeMove, onSwipeEnd } = options;
  
  let startX = 0;
  let startY = 0;
  let isSwiping = false;
  
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
  
  const bindEvents = () => {
    if (elementRef) {
      elementRef.addEventListener('touchstart', handleTouchStart, { passive: false });
      elementRef.addEventListener('touchmove', handleTouchMove, { passive: false });
      elementRef.addEventListener('touchend', handleTouchEnd, { passive: false });
      elementRef.addEventListener('touchcancel', handleTouchEnd, { passive: false });
    }
  };
  
  const unbindEvents = () => {
    if (elementRef) {
      elementRef.removeEventListener('touchstart', handleTouchStart);
      elementRef.removeEventListener('touchmove', handleTouchMove);
      elementRef.removeEventListener('touchend', handleTouchEnd);
      elementRef.removeEventListener('touchcancel', handleTouchEnd);
    }
  };
  
  onMounted(() => {
    bindEvents();
  });
  
  onUnmounted(() => {
    unbindEvents();
  });
  
  return {
    bindEvents,
    unbindEvents
  };
}