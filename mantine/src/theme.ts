import { createTheme } from '@mantine/core';

/**
 * Mantine themes are plain objects; light/dark is handled by the provider's
 * colour scheme rather than by declaring two palettes.
 */
export const theme = createTheme({
  primaryColor: 'indigo',
  defaultRadius: 'md',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  headings: {
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    sizes: {
      h1: { fontSize: '1.75rem', fontWeight: '700' },
      h2: { fontSize: '1.125rem', fontWeight: '650' },
    },
  },
});
