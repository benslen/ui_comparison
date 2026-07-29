import type { ToastSpec } from '@data';

/** antd notifications take the tone as a method name rather than a prop. */
export const toneMethod: Record<ToastSpec['tone'], 'success' | 'error' | 'info' | 'warning'> = {
  success: 'success',
  error: 'error',
  info: 'info',
  warning: 'warning',
};

export function toastArgs(spec: ToastSpec) {
  return {
    // v6 renamed the headline prop from `message` to `title`.
    title: spec.title,
    description: spec.description,
    placement: 'bottomRight' as const,
    duration: 4,
  };
}
