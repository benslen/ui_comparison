/**
 * The six implementations the shell switches between.
 *
 * Bundle figures are the measured production build of the shared reference
 * screen — `npm run build:all && npm run sizes` at the workspace root is the
 * source of truth, this is a snapshot of it for display.
 */
export interface LibraryEntry {
  id: string;
  name: string;
  version: string;
  /** Dev-server port; also the folder name under /apps in the built site. */
  port: number;
  dir: string;
  /** Total gzipped production bundle, kB. */
  sizeKb: number;
  /** Component families, counted from the installed package. */
  components: number | null;
  componentsNote?: string;
  license: string;
  styling: string;
  accent: string;
  /** One-line honest read on the look. */
  take: string;
}

export const libraries: LibraryEntry[] = [
  {
    id: 'mui',
    name: 'MUI',
    version: '9.2',
    port: 5001,
    dir: 'mui',
    sizeKb: 215.2,
    components: 72,
    license: 'MIT',
    styling: 'Emotion CSS-in-JS',
    accent: '#4f8cff',
    take: 'Unmistakably Material — capable and best-documented, but no neutral setting.',
  },
  {
    id: 'mantine',
    name: 'Mantine',
    version: '9.5',
    port: 5002,
    dir: 'mantine',
    sizeKb: 202.7,
    components: 127,
    license: 'MIT',
    styling: 'Static CSS + modules',
    accent: '#22b8cf',
    take: 'Sharp and neutral, genuinely good dark mode. My pick for a maintained product.',
  },
  {
    id: 'chakra',
    name: 'Chakra UI',
    version: '3.36',
    port: 5003,
    dir: 'chakra',
    sizeKb: 194.3,
    components: 108,
    license: 'MIT',
    styling: 'CSS-in-JS + tokens',
    accent: '#c07cf5',
    take: 'Clean and modern, close to shadcn with less setup. Slightly generic.',
  },
  {
    id: 'antd',
    name: 'Ant Design',
    version: '6.5',
    port: 5004,
    dir: 'antd',
    sizeKb: 344.9,
    components: 67,
    license: 'MIT',
    styling: 'CSS-in-JS + tokens',
    accent: '#ff7875',
    take: 'Dense and unashamedly enterprise. Only table here that sorts and paginates itself.',
  },
  {
    id: 'shadcn',
    name: 'shadcn/ui',
    version: '—',
    port: 5005,
    dir: 'shadcn',
    sizeKb: 152.6,
    components: 15,
    componentsNote: '15 vendored here; ~50 in the registry (unverified — registry blocked)',
    license: 'MIT',
    styling: 'Tailwind v4 + CVA',
    accent: '#e4e4e7',
    take: 'Best-looking of the six and the most work — the components become your code.',
  },
  {
    id: 'daisyui',
    name: 'DaisyUI',
    version: '5.7',
    port: 5006,
    dir: 'daisyui',
    sizeKb: 80.0,
    components: 61,
    componentsNote: '61 CSS component files — skins, not behaviours',
    license: 'MIT',
    styling: 'Tailwind plugin, pure CSS',
    accent: '#f7c948',
    take: 'A third the size of anything else, but ships zero JavaScript — behaviour is yours.',
  },
];

export const smallest = libraries.reduce((a, b) => (a.sizeKb <= b.sizeKb ? a : b));
export const largest = libraries.reduce((a, b) => (a.sizeKb >= b.sizeKb ? a : b));

/**
 * In dev each app runs on its own port and is framed cross-origin, which keeps
 * every app independently runnable. The built site serves them from /apps/<id>/
 * on a single origin, so one static bundle is the whole comparison.
 */
export function appUrl(entry: LibraryEntry): string {
  return import.meta.env.DEV ? `http://localhost:${entry.port}/` : `${import.meta.env.BASE_URL}apps/${entry.dir}/`;
}
