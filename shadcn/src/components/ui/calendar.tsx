import { DayPicker } from 'react-day-picker';
import type { ComponentProps } from 'react';
import 'react-day-picker/style.css';
import { cn } from '@/lib/utils';

/**
 * shadcn has no date picker of its own — the documented recipe is Popover +
 * react-day-picker. The picker's own stylesheet is themed through its CSS
 * variables so it tracks light/dark with the rest of the app.
 */
function Calendar({ className, ...props }: ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      className={cn('rdp-themed p-3', className)}
      showOutsideDays
      {...props}
    />
  );
}

export { Calendar };
