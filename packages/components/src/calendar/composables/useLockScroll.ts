import { onBeforeUnmount } from 'vue';

/**
 * useLockScroll - 锁定背景滚动
 * - SSR 安全：typeof document !== 'undefined' 守卫
 * - iOS 橡皮筋效果：通过 touchmove 事件拦截（passive: false）
 * - 返回 cleanup 函数用于手动解锁
 */
export function useLockScroll() {
  let savedOverflow = '';
  let savedPosition = '';
  let savedTop = '';
  let savedWidth = '';
  let locked = false;

  // 保存函数引用，确保 add/remove 匹配
  const preventDefault = (e: TouchEvent) => {
    // 允许内部滚动容器正常滚动
    const target = e.target as HTMLElement;
    const scrollable = target.closest(
      '.weui-calendar-scroll, .weui-calendar-picker-body'
    );
    if (scrollable) {
      return;
    }
    e.preventDefault();
  };

  const lockScroll = (): (() => void) => {
    // SSR 守卫
    if (typeof document === 'undefined') {
      return () => {};
    }
    if (locked) {
      return unlockScroll;
    }
    locked = true;

    // 保存当前状态
    savedOverflow = document.body.style.overflow;
    savedPosition = document.body.style.position;
    savedTop = document.body.style.top;
    savedWidth = document.body.style.width;

    // 锁定滚动
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = '100%';

    // iOS touchmove 拦截（防止橡皮筋效果）
    // 使用 passive: false 确保 preventDefault 生效
    document.addEventListener('touchmove', preventDefault, { passive: false });

    return unlockScroll;
  };

  const unlockScroll = () => {
    // SSR 守卫
    if (typeof document === 'undefined') {
      return;
    }
    if (!locked) {
      return;
    }
    locked = false;

    // 恢复滚动位置
    const scrollY = parseInt(document.body.style.top || '0', 10) * -1;

    // 恢复样式
    document.body.style.overflow = savedOverflow;
    document.body.style.position = savedPosition;
    document.body.style.top = savedTop;
    document.body.style.width = savedWidth;

    window.scrollTo(0, scrollY);

    // 正确移除 touchmove 监听器（使用同一函数引用）
    document.removeEventListener('touchmove', preventDefault);
  };

  // 自动在组件卸载时解锁
  onBeforeUnmount(() => {
    if (locked) {
      unlockScroll();
    }
  });

  return { lockScroll, unlockScroll };
}
