import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import type { ToastSpec } from '@data';

/**
 * MUI ships a Snackbar, not a toast system: no queue, no stacking, no imperative
 * `toast()` call. This provider is the glue every MUI app ends up writing —
 * a queue plus a context so components can fire a toast from anywhere.
 */

type ShowToast = (spec: ToastSpec) => void;

const ToastContext = createContext<ShowToast>(() => {
  throw new Error('useToast must be used inside <ToastHost>');
});

export function useToast(): ShowToast {
  return useContext(ToastContext);
}

export function ToastHost({ children }: { children: ReactNode }) {
  const [queue, setQueue] = useState<ToastSpec[]>([]);
  const [open, setOpen] = useState(false);

  const current = queue[0];

  const showToast = useCallback<ShowToast>((spec) => {
    setQueue((prev) => [...prev, spec]);
    setOpen(true);
  }, []);

  const handleClose = (_event: unknown, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // Drop the finished toast only after the exit transition, then reopen if more
  // are waiting — otherwise the next message pops in with no animation.
  const handleExited = () => {
    setQueue((prev) => {
      const rest = prev.slice(1);
      if (rest.length > 0) setOpen(true);
      return rest;
    });
  };

  const value = useMemo(() => showToast, [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        key={current ? `${current.title}-${queue.length}` : 'empty'}
        open={open && Boolean(current)}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        <Alert
          onClose={handleClose}
          severity={current?.tone ?? 'info'}
          variant="filled"
          sx={{ width: '100%', maxWidth: 380, alignItems: 'flex-start' }}
        >
          <AlertTitle sx={{ mb: 0.25 }}>{current?.title}</AlertTitle>
          {current?.description}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
