/**
 * 判断当前组件库是否处于暗黑模式
 * @returns boolean
 */
export function isDarkMode(): boolean {
  const eleTheme = document.body.getAttribute('data-weui-theme');
  return eleTheme
    ? eleTheme === 'dark'
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * 设置组件库主题
 * @param theme 'light' | 'dark' | 'system'
 */
export function setTheme(theme: 'dark' | 'light' | 'system') {
  if (theme === 'system') {
    document.body.removeAttribute('data-weui-theme');
  } else {
    document.body.setAttribute('data-weui-theme', theme);
  }
}
