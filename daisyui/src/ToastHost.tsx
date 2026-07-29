import { createContext, useCallback, useContext, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { ToastSpec } from '@data';

/**
 * daisyUI gives you `.toast` and `.alert` classes and nothing else — no queue,
 * no timers, no imperative API. The entire toast *system* is application code;
 * the library only supplies the skin.
 */
type ShowToast = (spec: ToastSpec) => void;

const ToastContext = createContext<ShowToast>(() => {
  throw new Error('useToast must be used inside <ToastHost>');
});

export function useToast(): ShowToast {
  return useContext(ToastContext);
}

interface ActiveToast extends ToastSpec {
  id: number;
}

const alertClass: Record<ToastSpec['tone'], string> = {
  success: 'alert-success',
  error: 'alert-error',
  info: 'alert-info',
  warning: 'alert-warning',
};

const alertIcon: Record<ToastSpec['tone'], typeof Info> = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
  warning: TriangleAlert,
};

export function ToastHost({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback<ShowToast>((spec) => {
    const id = nextId.current++;
    setToasts((prev) => [...prev, { ...spec, id }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast toast-end z-100">
        {toasts.map((toast) => {
          const Icon = alertIcon[toast.tone];
          return (
            <div key={toast.id} className={`alert ${alertClass[toast.tone]} max-w-sm shadow-lg`}>
              <Icon className="size-5 shrink-0" />
              <div className="text-left">
                <div className="font-semibold">{toast.title}</div>
                <div className="text-sm opacity-90">{toast.description}</div>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-xs"
                aria-label="Dismiss"
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
