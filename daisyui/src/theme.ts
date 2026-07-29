import { useCallback, useEffect, useState } from 'react';

/**
 * daisyUI is CSS-only: dark mode is the `data-theme` attribute on <html> and
 * nothing else. There is no provider, no context, no hook — so the app owns
 * the state and writes the attribute itself.
 */
const STORAGE_KEY = 'nimbus-theme';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, isDark: theme === 'dark', toggle };
}
