#!/usr/bin/env node
// Reports production bundle size per app. Run `npm run build:all` first —
// this only measures what is already in each app's dist/.
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apps = ['mui', 'mantine', 'chakra', 'antd', 'shadcn', 'daisyui'];

const kb = (n) => (n / 1024).toFixed(1);

const rows = [];
for (const app of apps) {
  const dir = join(root, app, 'dist', 'assets');
  if (!existsSync(dir)) {
    console.error(`skipping ${app}: no dist/ — run "npm run build:all" first`);
    continue;
  }
  let js = 0;
  let jsGz = 0;
  let css = 0;
  let cssGz = 0;
  for (const file of readdirSync(dir)) {
    const buf = readFileSync(join(dir, file));
    const gz = gzipSync(buf, { level: 9 }).length;
    if (file.endsWith('.js')) {
      js += buf.length;
      jsGz += gz;
    } else if (file.endsWith('.css')) {
      css += buf.length;
      cssGz += gz;
    }
  }
  rows.push({ app, js, jsGz, css, cssGz, total: js + css, totalGz: jsGz + cssGz });
}

rows.sort((a, b) => a.totalGz - b.totalGz);

console.log('');
console.log('App        JS raw    JS gz   CSS raw   CSS gz   Total raw   Total gz');
console.log('-'.repeat(70));
for (const r of rows) {
  console.log(
    r.app.padEnd(10),
    `${kb(r.js)}`.padStart(8),
    `${kb(r.jsGz)}`.padStart(8),
    `${kb(r.css)}`.padStart(9),
    `${kb(r.cssGz)}`.padStart(8),
    `${kb(r.total)}`.padStart(11),
    `${kb(r.totalGz)}`.padStart(10),
  );
}
console.log('');
console.log('All figures in kB. MUI and Chakra emit almost no CSS file because');
console.log('their styles are injected at runtime from JS — their styling cost');
console.log('is already inside the JS column.');
console.log('');
