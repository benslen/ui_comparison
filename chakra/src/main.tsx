import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import { ColorModeProvider } from './color-mode';
import { system } from './theme';
import { Toaster } from './toast';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ColorModeProvider>
        <App />
        <Toaster />
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
);
