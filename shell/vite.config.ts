import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT = 5000;

/**
 * Every implementation is reached through this one dev server at
 * /apps/<name>/, proxied to that app's own Vite server behind the scenes.
 *
 * The apps are still separate processes on their own ports — they just aren't
 * addressed directly by the browser. That matters for remote environments
 * (Codespaces, devcontainers, SSH): the browser is not on the same machine, so
 * `localhost:5001` inside a frame would resolve to the *viewer's* laptop and
 * hang. One origin means one forwarded port and no cross-origin auth to set up.
 *
 * `npm run dev` at the workspace root starts each app with APP_BASE set to the
 * matching subpath so its asset URLs line up with this proxy.
 */
const apps = {
  mui: 5001,
  mantine: 5002,
  chakra: 5003,
  antd: 5004,
  shadcn: 5005,
  daisyui: 5006,
};

const proxy = Object.fromEntries(
  Object.entries(apps).map(([id, port]) => [
    `/apps/${id}`,
    {
      target: `http://127.0.0.1:${port}`,
      // Rewrite the Host header to the app's own origin so the proxied request
      // doesn't trip that app's dev-server host check.
      changeOrigin: true,
      // Each app's hot-reload websocket rides through the same path.
      ws: true,
    },
  ]),
);

// Codespaces and similar remote hosts serve this over HTTPS on a generated
// hostname, so the dev server must bind publicly and accept that Host.
const allowedHosts = ['localhost', '127.0.0.1', '.app.github.dev', '.github.dev', '.gitpod.io'];

// Forwarded ports terminate TLS on :443, which is where the HMR socket has to
// connect — the default (dev port over ws://) never resolves through the proxy.
const remote = Boolean(process.env.CODESPACES || process.env.GITPOD_WORKSPACE_ID);

export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
    strictPort: true,
    host: true,
    allowedHosts,
    proxy,
    hmr: remote ? { clientPort: 443, protocol: 'wss' } : undefined,
  },
  preview: { port: PORT, strictPort: true, host: true, allowedHosts },
});
