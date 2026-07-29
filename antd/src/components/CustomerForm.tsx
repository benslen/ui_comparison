import { useState } from 'react';
import { App, Button, Card, Checkbox, DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { formCopy, planOptions } from '@data';
import { SectionHeader } from './SectionHeader';
import { toastArgs, toneMethod } from '../toast';

interface FormValues {
  name: string;
  plan: string;
  startDate: Dayjs;
  welcome: boolean;
}

export function CustomerForm() {
  const { notification } = App.useApp();
  const [form] = Form.useForm<FormValues>();
  const [submitting, setSubmitting] = useState(false);

  const handleFinish = () => {
    setSubmitting(true);
    notification[toneMethod[formCopy.successToast.tone]](toastArgs(formCopy.successToast));
    form.resetFields();
    setSubmitting(false);
  };

  const handleFailed = () => {
    notification[toneMethod[formCopy.validationToast.tone]](toastArgs(formCopy.validationToast));
  };

  return (
    <Card style={{ height: '100%' }} styles={{ body: { padding: 20 } }}>
      <SectionHeader title={formCopy.title} subtitle={formCopy.subtitle} />
      {/* antd's Form owns validation state; the other libraries need it wired by hand. */}
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        style={{ marginTop: 16 }}
        initialValues={{ startDate: dayjs(), welcome: true }}
        onFinish={handleFinish}
        onFinishFailed={handleFailed}
      >
        <Form.Item
          name="name"
          label={formCopy.nameLabel}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Input placeholder={formCopy.namePlaceholder} />
        </Form.Item>

        <Form.Item
          name="plan"
          label={formCopy.planLabel}
          rules={[{ required: true, message: 'Required' }]}
        >
          <Select placeholder={formCopy.planPlaceholder} options={planOptions} />
        </Form.Item>

        <Form.Item name="startDate" label={formCopy.dateLabel}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item name="welcome" valuePropName="checked">
          <Checkbox>{formCopy.consentLabel}</Checkbox>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" htmlType="submit" size="large" block loading={submitting}>
            {formCopy.submitLabel}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
