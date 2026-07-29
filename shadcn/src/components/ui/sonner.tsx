import { useTheme } from 'next-themes';
import { Toaster as Sonner } from 'sonner';
import type { ComponentProps } from 'react';

/**
 * shadcn does not implement toasts — it re-exports Sonner, a separate library,
 * wired to the app's theme.
 */
function Toaster(props: ComponentProps<typeof Sonner>) {
  const { resolvedTheme } = useTheme();

  return (
    <Sonner
      theme={(resolvedTheme as ComponentProps<typeof Sonner>['theme']) ?? 'light'}
      className="toaster group"
      position="bottom-right"
      richColors
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
}

export { Toaster };
