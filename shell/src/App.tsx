import { useCallback, useEffect, useRef, useState } from 'react';
import { appUrl, largest, libraries, smallest } from './libraries';
import type { LibraryEntry } from './libraries';

function readLibFromUrl(): LibraryEntry {
  const requested = new URLSearchParams(window.location.search).get('lib');
  return libraries.find((entry) => entry.id === requested) ?? libraries[0];
}

export default function App() {
  const [active, setActive] = useState<LibraryEntry>(readLibFromUrl);
  // Frames are kept mounted once visited so switching back is instant and each
  // app keeps its state (sort column, open tab, dark mode).
  const [mounted, setMounted] = useState<string[]>([active.id]);
  const [loaded, setLoaded] = useState<string[]>([]);
  const barRef = useRef<HTMLDivElement>(null);

  const select = useCallback((entry: LibraryEntry) => {
    setActive(entry);
    setMounted((prev) => (prev.includes(entry.id) ? prev : [...prev, entry.id]));
    const url = new URL(window.location.href);
    url.searchParams.set('lib', entry.id);
    window.history.pushState({ lib: entry.id }, '', url);
  }, []);

  // Back/forward should move between libraries.
  useEffect(() => {
    const onPop = () => {
      const entry = readLibFromUrl();
      setActive(entry);
      setMounted((prev) => (prev.includes(entry.id) ? prev : [...prev, entry.id]));
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // 1–6 jump straight to a library; ← / → step through them.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const digit = Number(event.key);
      if (digit >= 1 && digit <= libraries.length) {
        select(libraries[digit - 1]);
        return;
      }
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        const index = libraries.findIndex((entry) => entry.id === active.id);
        const next =
          event.key === 'ArrowRight'
            ? (index + 1) % libraries.length
            : (index - 1 + libraries.length) % libraries.length;
        select(libraries[next]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active.id, select]);

  useEffect(() => {
    document.title = `${active.name} — UI Library Comparison`;
  }, [active]);

  const isLoaded = loaded.includes(active.id);
  const sizeRatio = active.sizeKb / largest.sizeKb;

  return (
    <div className="shell">
      <header className="chrome">
        <div className="chrome-top">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <div>
              <div className="brand-name">UI Library Comparison</div>
              <div className="brand-sub">Same screen, same data, six libraries</div>
            </div>
          </div>

          <nav className="switcher" ref={barRef} aria-label="Choose a UI library">
            {libraries.map((entry, index) => {
              const current = entry.id === active.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  className={`tab${current ? ' is-active' : ''}`}
                  style={{ ['--accent' as string]: entry.accent }}
                  aria-current={current ? 'page' : undefined}
                  onClick={() => select(entry)}
                >
                  <span className="tab-dot" aria-hidden="true" />
                  <span className="tab-name">{entry.name}</span>
                  <kbd className="tab-key">{index + 1}</kbd>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="meta" style={{ ['--accent' as string]: active.accent }}>
          <div className="meta-facts">
            <span className="meta-title">
              {active.name}
              {active.version !== '—' && <span className="meta-version"> {active.version}</span>}
            </span>
            <span className="meta-sep" aria-hidden="true" />

            <span className="meta-item" title="Gzipped production build of this screen">
              <span className="meta-value">{active.sizeKb.toFixed(1)} kB</span>
              <span className="meta-label">gzipped</span>
              <span className="meta-bar" aria-hidden="true">
                <span className="meta-bar-fill" style={{ width: `${sizeRatio * 100}%` }} />
              </span>
              {active.id === smallest.id && <span className="meta-flag">smallest</span>}
              {active.id === largest.id && <span className="meta-flag is-warn">largest</span>}
            </span>

            <span className="meta-item" title={active.componentsNote ?? 'Component families'}>
              <span className="meta-value">{active.components}</span>
              <span className="meta-label">components{active.componentsNote ? '*' : ''}</span>
            </span>

            <span className="meta-item">
              <span className="meta-value">{active.styling}</span>
              <span className="meta-label">styling</span>
            </span>

            <span className="meta-item">
              <span className="meta-value">{active.license}</span>
              <span className="meta-label">license</span>
            </span>
          </div>

          <div className="meta-actions">
            <p className="take">{active.take}</p>
            <a className="open" href={appUrl(active)} target="_blank" rel="noreferrer">
              Open alone ↗
            </a>
          </div>
        </div>
      </header>

      <main className="stage">
        {mounted.map((id) => {
          const entry = libraries.find((item) => item.id === id)!;
          return (
            <iframe
              key={entry.id}
              className={`frame${entry.id === active.id ? ' is-active' : ''}`}
              src={appUrl(entry)}
              title={`${entry.name} implementation of the reference screen`}
              onLoad={() => setLoaded((prev) => (prev.includes(entry.id) ? prev : [...prev, entry.id]))}
            />
          );
        })}

        {!isLoaded && (
          <div className="loading" role="status">
            <span className="spinner" aria-hidden="true" />
            <p>Loading {active.name}…</p>
            {import.meta.env.DEV && (
              <p className="hint">
                Nothing here? The {active.name} dev server should be on port {active.port}. Run{' '}
                <code>npm run dev</code> at the workspace root to boot all six.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
