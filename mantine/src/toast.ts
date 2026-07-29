import type { ToastSpec } from '@data';

/**
 * Maps the shared toast spec onto Mantine's `notifications.show()` payload.
 * Mantine has a real notification system, so this is just colour mapping.
 */
const toneColor: Record<ToastSpec['tone'], string> = {
  success: 'teal',
  error: 'red',
  info: 'blue',
  warning: 'orange',
};

export function toastProps(spec: ToastSpec) {
  return {
    title: spec.title,
    message: spec.description,
    color: toneColor[spec.tone],
    withBorder: true,
    autoClose: 4000,
  };
}
