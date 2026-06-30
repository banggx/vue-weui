import { onMounted, onUnmounted } from 'vue';

export function useLockScroll() {
  const lockScroll = () => {
    // 保存当前滚动位置
    const scrollY = window.scrollY;
    
    // 禁用body滚动
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    
    // 防止页面滚动
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };
    
    document.body.addEventListener('touchmove', preventDefault, { passive: false });
    
    return () => {
      // 恢复body滚动
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // 恢复滚动位置
      window.scrollTo(0, scrollY);
      
      document.body.removeEventListener('touchmove', preventDefault);
    };
  };
  
  const unlockScroll = () => {
    // 恢复body滚动
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // 移除事件监听器
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };
    
    document.body.removeEventListener('touchmove', preventDefault);
  };
  
  onMounted(() => {
    // 在组件挂载时，如果需要锁定滚动，可以调用lockScroll
  });
  
  onUnmounted(() => {
    // 在组件卸载时，确保解锁滚动
    unlockScroll();
  });
  
  return {
    lockScroll,
    unlockScroll
  };
}