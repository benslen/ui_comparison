import { Button, Card, Modal, Stack, Text, TextInput, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { modalCopy, pageCopy, toastSpecs } from '@data';
import { SectionHeader } from './SectionHeader';
import { toastProps } from '../toast';

export function ActionsPanel() {
  const [opened, { open, close }] = useDisclosure(false);

  const confirmInvite = () => {
    close();
    notifications.show(toastProps(toastSpecs.success));
  };

  return (
    <Card withBorder radius="md" padding="lg" h="100%">
      <SectionHeader title={pageCopy.actionsTitle} subtitle={pageCopy.actionsSubtitle} />
      <Stack gap="xs" mt="md">
        <Button onClick={open}>Open modal</Button>
        <Button
          variant="outline"
          color="teal"
          onClick={() => notifications.show(toastProps(toastSpecs.success))}
        >
          Success toast
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => notifications.show(toastProps(toastSpecs.error))}
        >
          Error toast
        </Button>
        <Button
          variant="outline"
          color="blue"
          onClick={() => notifications.show(toastProps(toastSpecs.info))}
        >
          Info toast
        </Button>
      </Stack>

      <Modal opened={opened} onClose={close} title={modalCopy.title} centered radius="md">
        <Text size="sm" c="dimmed" mb="md">
          {modalCopy.body}
        </Text>
        <TextInput
          data-autofocus
          label="Email address"
          placeholder="teammate@example.com"
          type="email"
        />
        <Group justify="flex-end" mt="lg" gap="xs">
          <Button variant="default" onClick={close}>
            {modalCopy.cancelLabel}
          </Button>
          <Button onClick={confirmInvite}>{modalCopy.confirmLabel}</Button>
        </Group>
      </Modal>
    </Card>
  );
}
