import { useState } from 'react';
import type { FormEvent } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { formCopy, planOptions } from '@data';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { SectionHeader } from './SectionHeader';
import { showToast } from '@/toast';

export function CustomerForm() {
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [welcome, setWelcome] = useState(true);
  const [touched, setTouched] = useState(false);

  const nameInvalid = touched && name.trim() === '';
  const planInvalid = touched && plan === '';

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
    <Card className="h-full">
      <CardContent className="p-5">
        <SectionHeader title={formCopy.title} subtitle={formCopy.subtitle} />
        <form onSubmit={handleSubmit} noValidate className="mt-4 flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">{formCopy.nameLabel}</Label>
            <Input
              id="name"
              value={name}
              placeholder={formCopy.namePlaceholder}
              aria-invalid={nameInvalid}
              onChange={(event) => setName(event.currentTarget.value)}
            />
            {nameInvalid && <p className="text-destructive text-xs">Required</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="plan">{formCopy.planLabel}</Label>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger id="plan" aria-invalid={planInvalid}>
                <SelectValue placeholder={formCopy.planPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                {planOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {planInvalid && <p className="text-destructive text-xs">Required</p>}
          </div>

          {/* Popover + react-day-picker is the documented shadcn date-picker recipe. */}
          <div className="grid gap-2">
            <Label>{formCopy.dateLabel}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className={cn(
                    'justify-start font-normal',
                    !startDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon />
                  {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} autoFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="welcome"
              checked={welcome}
              onCheckedChange={(checked) => setWelcome(checked === true)}
            />
            <Label htmlFor="welcome" className="font-normal">
              {formCopy.consentLabel}
            </Label>
          </div>

          <Button type="submit" size="lg" className="w-full">
            {formCopy.submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
