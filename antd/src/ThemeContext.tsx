import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { App as AntApp, ConfigProvider, theme as antdTheme } from 'antd';

/**
 * antd has no colour-mode hook — light/dark is a theme *algorithm* swapped on
 * ConfigProvider, so the app owns the mode state and this context exposes it.
 */
interface ColorModeValue {
  isDark: boolean;
  toggle: () => void;
}

const ColorModeContext = createContext<ColorModeValue>({ isDark: false, toggle: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const value = useMemo<ColorModeValue>(
    () => ({ isDark, toggle: () => setIsDark((prev) => !prev) }),
    [isDark],
  );

  return (
    <ColorModeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm: isDark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            colorPrimary: '#4f46e5',
            borderRadius: 10,
            fontFamily:
              'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          },
          components: {
            Layout: {
              headerBg: isDark ? '#141414' : '#ffffff',
              bodyBg: isDark ? '#000000' : '#f6f7fb',
              headerHeight: 60,
              headerPadding: '0 16px',
            },
          },
        }}
      >
        {/* `App` supplies the context that `notification`/`message` hooks need. */}
        <AntApp>{children}</AntApp>
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
}
