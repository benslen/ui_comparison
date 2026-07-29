import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  Button,
  Card,
  Checkbox,
  Field,
  Input,
  Portal,
  Select,
  Stack,
  createListCollection,
} from '@chakra-ui/react';
import { formCopy, planOptions } from '@data';
import { SectionHeader } from './SectionHeader';
import { showToast } from '../toast';

// Chakra v3 selects take a "collection" rather than a plain options array.
const plans = createListCollection({ items: planOptions });

export function CustomerForm() {
  const [name, setName] = useState('');
  const [plan, setPlan] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [welcome, setWelcome] = useState(true);
  const [touched, setTouched] = useState(false);

  const nameInvalid = touched && name.trim() === '';
  const planInvalid = touched && plan.length === 0;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (name.trim() === '' || plan.length === 0) {
      showToast(formCopy.validationToast);
      return;
    }
    showToast(formCopy.successToast);
    setName('');
    setPlan([]);
    setTouched(false);
  };

  return (
    <Card.Root variant="outline" h="100%">
      <Card.Body p="5">
        <SectionHeader title={formCopy.title} subtitle={formCopy.subtitle} />
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap="4" mt="4">
            <Field.Root invalid={nameInvalid}>
              <Field.Label>{formCopy.nameLabel}</Field.Label>
              <Input
                value={name}
                placeholder={formCopy.namePlaceholder}
                onChange={(event) => setName(event.currentTarget.value)}
              />
              <Field.ErrorText>Required</Field.ErrorText>
            </Field.Root>

            <Select.Root
              collection={plans}
              value={plan}
              onValueChange={(details) => setPlan(details.value)}
              invalid={planInvalid}
            >
              <Select.HiddenSelect />
              <Select.Label>{formCopy.planLabel}</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder={formCopy.planPlaceholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content>
                    {planOptions.map((option) => (
                      <Select.Item key={option.value} item={option}>
                        {option.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>

            {/* Chakra v3 has no date picker component — this is a native input. */}
            <Field.Root>
              <Field.Label>{formCopy.dateLabel}</Field.Label>
              <Input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.currentTarget.value)}
              />
            </Field.Root>

            <Checkbox.Root
              checked={welcome}
              onCheckedChange={(details) => setWelcome(details.checked === true)}
              colorPalette="brand"
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>{formCopy.consentLabel}</Checkbox.Label>
            </Checkbox.Root>

            <Button type="submit" colorPalette="brand" size="lg" width="100%">
              {formCopy.submitLabel}
            </Button>
          </Stack>
        </form>
      </Card.Body>
    </Card.Root>
  );
}
