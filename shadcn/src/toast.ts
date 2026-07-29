import { toast } from 'sonner';
import type { ToastSpec } from '@data';

/** Maps the shared toast spec onto Sonner's tone-specific methods. */
export function showToast(spec: ToastSpec) {
  const fn =
    spec.tone === 'success'
      ? toast.success
      : spec.tone === 'error'
        ? toast.error
        : spec.tone === 'warning'
          ? toast.warning
          : toast.info;
  fn(spec.title, { description: spec.description, duration: 4000 });
}
