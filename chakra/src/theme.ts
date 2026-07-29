import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

/**
 * Chakra v3 replaced `extendTheme` with a config object compiled by
 * `createSystem`. Custom palettes need both the raw `tokens` and the
 * `semanticTokens` that map them onto solid/contrast/fg/muted slots — a
 * `colorPalette="brand"` prop silently does nothing without the second half.
 */
const config = defineConfig({
  globalCss: {
    'html, body, #root': { height: '100%' },
    body: { bg: 'bg.subtle' },
  },
  theme: {
    tokens: {
      fonts: {
        heading: {
          value: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
        body: {
          value: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      },
      colors: {
        brand: {
          50: { value: '#eef2ff' },
          100: { value: '#e0e7ff' },
          200: { value: '#c7d2fe' },
          300: { value: '#a5b4fc' },
          400: { value: '#818cf8' },
          500: { value: '#6366f1' },
          600: { value: '#4f46e5' },
          700: { value: '#4338ca' },
          800: { value: '#3730a3' },
          900: { value: '#312e81' },
          950: { value: '#1e1b4b' },
        },
      },
    },
    semanticTokens: {
      colors: {
        brand: {
          solid: { value: { base: '{colors.brand.600}', _dark: '{colors.brand.500}' } },
          contrast: { value: '#ffffff' },
          fg: { value: { base: '{colors.brand.700}', _dark: '{colors.brand.300}' } },
          muted: { value: { base: '{colors.brand.100}', _dark: '{colors.brand.900}' } },
          subtle: { value: { base: '{colors.brand.50}', _dark: '{colors.brand.950}' } },
          emphasized: { value: { base: '{colors.brand.200}', _dark: '{colors.brand.800}' } },
          focusRing: { value: { base: '{colors.brand.500}', _dark: '{colors.brand.400}' } },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
