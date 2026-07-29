import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = 5001;

// When the workspace is built as one combined site, each app is served from
// /apps/<name>/ instead of the domain root. Standalone dev/build is unaffected.
const base = process.env.APP_BASE ?? '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@data': fileURLToPath(new URL('../data', import.meta.url)),
    },
  },
  // The shared /data folder lives outside this app's root, so the dev server
  // needs permission to read one level up.
  // host/allowedHosts only matter when this app is run standalone on a remote
  // machine; under `npm run dev` it is reached through the shell's proxy.
  server: {
    port: PORT,
    strictPort: true,
    host: true,
    allowedHosts: ['localhost', '127.0.0.1', '.app.github.dev', '.github.dev', '.gitpod.io'],
    fs: { allow: ['..'] },
  },
  preview: { port: PORT, strictPort: true },
});
