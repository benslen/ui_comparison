import { Button, Card, Dialog, Field, Input, Portal, Stack, Text } from '@chakra-ui/react';
import { modalCopy, pageCopy, toastSpecs } from '@data';
import { SectionHeader } from './SectionHeader';
import { showToast } from '../toast';

export function ActionsPanel() {
  return (
    <Card.Root variant="outline" h="100%">
      <Card.Body p="5">
        <SectionHeader title={pageCopy.actionsTitle} subtitle={pageCopy.actionsSubtitle} />
        <Stack gap="2" mt="4">
          <Dialog.Root placement="center">
            <Dialog.Trigger asChild>
              <Button colorPalette="brand">Open modal</Button>
            </Dialog.Trigger>
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{modalCopy.title}</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Text fontSize="sm" color="fg.muted" mb="4">
                      {modalCopy.body}
                    </Text>
                    <Field.Root>
                      <Field.Label>Email address</Field.Label>
                      <Input type="email" placeholder="teammate@example.com" />
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">{modalCopy.cancelLabel}</Button>
                    </Dialog.ActionTrigger>
                    <Dialog.ActionTrigger asChild>
                      <Button colorPalette="brand" onClick={() => showToast(toastSpecs.success)}>
                        {modalCopy.confirmLabel}
                      </Button>
                    </Dialog.ActionTrigger>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger />
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <Button variant="outline" colorPalette="green" onClick={() => showToast(toastSpecs.success)}>
            Success toast
          </Button>
          <Button variant="outline" colorPalette="red" onClick={() => showToast(toastSpecs.error)}>
            Error toast
          </Button>
          <Button variant="outline" colorPalette="blue" onClick={() => showToast(toastSpecs.info)}>
            Info toast
          </Button>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
}
