import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button, Card, Checkbox, Select, Stack, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { notifications } from '@mantine/notifications';
import { formCopy, planOptions } from '@data';
import { SectionHeader } from './SectionHeader';
import { toastProps } from '../toast';

export function CustomerForm() {
  const [name, setName] = useState('');
  const [plan, setPlan] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(new Date().toISOString().slice(0, 10));
  const [welcome, setWelcome] = useState(true);
  const [touched, setTouched] = useState(false);

  const nameError = touched && name.trim() === '' ? 'Required' : null;
  const planError = touched && !plan ? 'Required' : null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (name.trim() === '' || !plan) {
      notifications.show(toastProps(formCopy.validationToast));
      return;
    }
    notifications.show(toastProps(formCopy.successToast));
    setName('');
    setPlan(null);
    setTouched(false);
  };

  return (
    <Card withBorder radius="md" padding="lg" h="100%">
      <SectionHeader title={formCopy.title} subtitle={formCopy.subtitle} />
      <form onSubmit={handleSubmit} noValidate>
        <Stack gap="md" mt="md">
          <TextInput
            label={formCopy.nameLabel}
            placeholder={formCopy.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            error={nameError}
          />
          <Select
            label={formCopy.planLabel}
            placeholder={formCopy.planPlaceholder}
            data={planOptions}
            value={plan}
            onChange={setPlan}
            error={planError}
          />
          <DatePickerInput
            label={formCopy.dateLabel}
            placeholder="Pick a date"
            value={startDate}
            onChange={setStartDate}
          />
          <Checkbox
            label={formCopy.consentLabel}
            checked={welcome}
            onChange={(event) => setWelcome(event.currentTarget.checked)}
          />
          <Button type="submit" size="md" fullWidth>
            {formCopy.submitLabel}
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
