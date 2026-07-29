import { ThemeProvider, useTheme } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Chakra v3 dropped `useColorMode` entirely — dark mode is delegated to
 * `next-themes`, a separate dependency, and every project re-implements this
 * shim. Chakra's dark condition is the `.dark` class, hence `attribute="class"`.
 */
export function ColorModeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export function useColorMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  return {
    isDark,
    toggle: () => setTheme(isDark ? 'light' : 'dark'),
  };
}
