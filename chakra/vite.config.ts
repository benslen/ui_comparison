import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = 5003;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@data': fileURLToPath(new URL('../data', import.meta.url)),
    },
  },
  // The shared /data folder lives outside this app's root, so the dev server
  // needs permission to read one level up.
  server: { port: PORT, strictPort: true, fs: { allow: ['..'] } },
  preview: { port: PORT, strictPort: true },
});
