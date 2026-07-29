import { Toast, Toaster as ChakraToaster, createToaster, Portal, Stack } from '@chakra-ui/react';
import type { ToastSpec } from '@data';

export const toaster = createToaster({
  placement: 'bottom-end',
  pauseOnPageIdle: true,
});

export function showToast(spec: ToastSpec) {
  toaster.create({
    title: spec.title,
    description: spec.description,
    type: spec.tone,
    duration: 4000,
  });
}

/**
 * Chakra's Toaster is a render prop over the toast store — the visual toast is
 * assembled here rather than provided ready-made.
 */
export function Toaster() {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Toast.Root width={{ md: 'sm' }}>
            <Toast.Indicator />
            <Stack gap="1" flex="1" maxWidth="100%">
              {toast.title && <Toast.Title>{toast.title}</Toast.Title>}
              {toast.description && <Toast.Description>{toast.description}</Toast.Description>}
            </Stack>
            <Toast.CloseTrigger />
          </Toast.Root>
        )}
      </ChakraToaster>
    </Portal>
  );
}
