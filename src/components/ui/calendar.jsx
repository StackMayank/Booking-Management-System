import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

function Calendar({ className, classNames, showOutsideDays = false, ...props }) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-1 sm:p-2 w-full relative', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row gap-2 sm:gap-4 w-full justify-center',
        month: 'relative w-full sm:w-auto',
        caption:
          'relative flex h-10 sm:h-12 items-center justify-center mb-2 min-h-10 sm:min-h-12',
        caption_label: 'text-sm sm:text-base font-semibold',
        nav: 'rdp-calendar-nav pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center px-1 sm:px-2',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-10 w-10 sm:h-12 sm:w-12 bg-transparent p-0 pointer-events-auto'
        ),
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex justify-center gap-1 sm:gap-2 mt-2',
        head_cell: 'text-muted-foreground rounded-md w-8 h-8 sm:w-10 sm:h-10 font-normal text-xs sm:text-sm flex items-center justify-center',
        row: 'flex justify-center gap-1 sm:gap-2 w-full mt-1',
        cell: 'h-8 w-8 sm:h-11 sm:w-10 text-center text-xs sm:text-sm group p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-start)]:rounded-l-md [&:has([aria-selected].day-range-end)]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 sm:h-11 sm:w-10 p-0 font-normal aria-selected:opacity-100 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-transparent rounded-[inherit] text-xs sm:text-sm'
        ),
        day_range_end: 'day-range-end',
        day_range_start: 'day-range-start',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'text-primary font-semibold',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
        day_disabled: 'text-muted-foreground opacity-30 cursor-not-allowed',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft
            className={cn('h-5 w-5 text-foreground', className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight
            className={cn('h-5 w-5 text-foreground', className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
// [&:not([aria-selected].day-range-end)]:[&:not([aria-selected].day-range-start)]:bg-red-500
