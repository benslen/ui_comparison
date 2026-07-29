import { useState } from 'react';
import { App, Button, Card, Input, Modal, Space, Typography } from 'antd';
import { modalCopy, pageCopy, toastSpecs } from '@data';
import { SectionHeader } from './SectionHeader';
import { toastArgs, toneMethod } from '../toast';

const { Text } = Typography;

export function ActionsPanel() {
  const { notification } = App.useApp();
  const [open, setOpen] = useState(false);

  const fire = (spec: (typeof toastSpecs)[keyof typeof toastSpecs]) =>
    notification[toneMethod[spec.tone]](toastArgs(spec));

  return (
    <Card style={{ height: '100%' }} styles={{ body: { padding: 20 } }}>
      <SectionHeader title={pageCopy.actionsTitle} subtitle={pageCopy.actionsSubtitle} />
      <Space orientation="vertical" size={10} style={{ width: '100%', marginTop: 16 }}>
        <Button type="primary" block onClick={() => setOpen(true)}>
          Open modal
        </Button>
        <Button block style={{ color: '#16a34a', borderColor: '#16a34a' }} onClick={() => fire(toastSpecs.success)}>
          Success toast
        </Button>
        <Button block danger onClick={() => fire(toastSpecs.error)}>
          Error toast
        </Button>
        <Button block style={{ color: '#2563eb', borderColor: '#2563eb' }} onClick={() => fire(toastSpecs.info)}>
          Info toast
        </Button>
      </Space>

      <Modal
        open={open}
        title={modalCopy.title}
        onCancel={() => setOpen(false)}
        onOk={() => {
          setOpen(false);
          fire(toastSpecs.success);
        }}
        okText={modalCopy.confirmLabel}
        cancelText={modalCopy.cancelLabel}
        centered
      >
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          {modalCopy.body}
        </Text>
        <Input type="email" placeholder="teammate@example.com" />
      </Modal>
    </Card>
  );
}
