#!/usr/bin/env node
/**
 * Builds the whole workspace into one deployable static site.
 *
 *   dist-site/
 *     index.html          ← the switcher shell
 *     apps/mui/           ← each implementation, served from its own subpath
 *     apps/mantine/
 *     ...
 *
 * Each app is rebuilt with APP_BASE=/apps/<id>/ so its asset URLs resolve from
 * that subpath. In dev the shell frames the six dev servers cross-origin
 * instead, which is why every app stays independently runnable.
 */
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'dist-site');
const apps = ['mui', 'mantine', 'chakra', 'antd', 'shadcn', 'daisyui'];

function run(cmd, args, cwd, env) {
  execFileSync(cmd, args, { cwd, stdio: 'inherit', env: { ...process.env, ...env } });
}

console.log('\nBuilding combined site → dist-site/\n');

rmSync(outDir, { recursive: true, force: true });
mkdirSync(join(outDir, 'apps'), { recursive: true });

for (const app of apps) {
  const appDir = join(root, app);
  if (!existsSync(join(appDir, 'node_modules'))) {
    throw new Error(`${app}/node_modules missing — run "npm run install:all" first`);
  }
  console.log(`\n── ${app} ─────────────────────────────`);
  run('npx', ['vite', 'build'], appDir, { APP_BASE: `/apps/${app}/` });
  cpSync(join(appDir, 'dist'), join(outDir, 'apps', app), { recursive: true });
}

console.log('\n── shell ─────────────────────────────');
run('npx', ['vite', 'build'], join(root, 'shell'));
cpSync(join(root, 'shell', 'dist'), outDir, { recursive: true });

console.log(`\n✓ Combined site written to dist-site/`);
console.log('  Preview it with:  npm run preview:site\n');
