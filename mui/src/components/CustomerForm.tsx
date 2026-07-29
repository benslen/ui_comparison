import { useState } from 'react';
import type { FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { formCopy, planOptions } from '@data';
import { SectionHeader } from './SectionHeader';
import { useToast } from '../ToastHost';

export function CustomerForm() {
  const showToast = useToast();
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [welcome, setWelcome] = useState(true);
  const [touched, setTouched] = useState(false);

  const nameError = touched && name.trim() === '';
  const planError = touched && plan === '';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setTouched(true);
    if (name.trim() === '' || plan === '') {
      showToast(formCopy.validationToast);
      return;
    }
    showToast(formCopy.successToast);
    setName('');
    setPlan('');
    setTouched(false);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent sx={{ p: 2.5 }}>
        <SectionHeader title={formCopy.title} subtitle={formCopy.subtitle} />
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
        >
          <TextField
            label={formCopy.nameLabel}
            placeholder={formCopy.namePlaceholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            error={nameError}
            helperText={nameError ? 'Required' : ' '}
            size="small"
            fullWidth
          />

          <TextField
            select
            label={formCopy.planLabel}
            value={plan}
            onChange={(event) => setPlan(event.target.value)}
            error={planError}
            helperText={planError ? 'Required' : ' '}
            size="small"
            fullWidth
          >
            {planOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <DatePicker
            label={formCopy.dateLabel}
            value={startDate}
            onChange={setStartDate}
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
          />

          <FormControlLabel
            control={
              <Checkbox checked={welcome} onChange={(event) => setWelcome(event.target.checked)} />
            }
            label={formCopy.consentLabel}
          />

          <Button type="submit" variant="contained" size="large">
            {formCopy.submitLabel}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
