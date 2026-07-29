import { createTheme } from '@mui/material/styles';

/**
 * MUI drives light/dark through CSS variables and `colorSchemes`, so both
 * palettes are declared up front and `useColorScheme()` flips between them
 * without a re-render of the whole tree.
 */
export const theme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#4f46e5' },
        background: { default: '#f6f7fb', paper: '#ffffff' },
      },
    },
    dark: {
      palette: {
        primary: { main: '#8b8cf7' },
        background: { default: '#0e1016', paper: '#171a23' },
      },
    },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily:
      'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: '1.75rem', fontWeight: 700 },
    h2: { fontSize: '1.125rem', fontWeight: 650 },
  },
  components: {
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: ({ theme }) => ({ border: `1px solid ${theme.palette.divider}` }),
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
  },
});
