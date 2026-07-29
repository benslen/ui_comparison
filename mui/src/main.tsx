import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from './App';
import { theme } from './theme';
import { ToastHost } from './ToastHost';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Writes the stored colour scheme before paint so dark mode doesn't flash. */}
    <InitColorSchemeScript attribute="data-mui-color-scheme" />
    <ThemeProvider theme={theme} defaultMode="light">
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ToastHost>
          <App />
        </ToastHost>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>,
);
