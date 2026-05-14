import { Calendar } from '@/components/ui/calendar';
import { FormControl, FormField, FormItem } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import dayjs from 'dayjs';
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const DateSelectInput = ({ form, className }) => {
  const isMobile = useIsMobile();

  return (
    <Popover>
      <FormField
        control={form.control}
        name="bookingDates"
        render={({ field }) => {
          const from = field?.value?.from;
          const to = field?.value?.to;
          const fromValid = from != null && dayjs(from).isValid();
          const toValid = to != null && dayjs(to).isValid();
          const showDateRange = fromValid && toValid;

          return (
          <>
            <PopoverTrigger asChild>
              <FormItem
                className={cn(
                  'group flex flex-1 cursor-pointer flex-col gap-1 px-4 py-3 transition-colors hover:bg-muted/40 lg:min-h-[56px] lg:min-w-0 lg:flex-[1_1_calc((100%-152px)/3)] border-t border-yellow-300/70 lg:border-t-0 lg:border-l',
                  className
                )}
              >
                <FormControl>
                  <div role="button" className="flex h-full flex-col gap-1 text-left">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      Check-in / out
                    </span>
                    <div className="flex min-h-[40px] items-center gap-3">
                    <Icon
                      icon="calendar"
                      size="24"
                      className="text-muted-foreground shrink-0 transition-transform group-hover:scale-105"
                    />
                    <div className="flex flex-1 flex-wrap items-center gap-x-2 gap-y-0.5 sm:flex-nowrap">
                      {showDateRange ? (
                        <>
                          <p className="text-sm font-semibold text-foreground">
                            {dayjs(from).format('ddd D MMM')}
                          </p>
                          <span aria-hidden className="text-muted-foreground">
                            –
                          </span>
                          <p className="text-sm font-semibold text-foreground">
                            {dayjs(to).format('ddd D MMM')}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-muted-foreground">
                          Add your travel date
                        </p>
                      )}
                    </div>
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            </PopoverTrigger>
            <PopoverContent
              side="top"
              sideOffset={-68}
              align="start"
              avoidCollisions={false}
              className="w-auto max-w-[calc(100vw-2rem)] sm:max-w-[800px] overflow-hidden rounded-xl border border-border p-2 sm:p-4 shadow-xl"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <Calendar
                required
                mode="range"
                min={2}
                selected={field.value}
                numberOfMonths={isMobile ? 1 : 2}
                fromMonth={new Date()}
                disabled={(date) => dayjs().isAfter(dayjs(date), 'date')}
                onSelect={(value) => {
                  field.onChange(value);
                }}
              />
            </PopoverContent>
          </>
          );
        }}
      />
    </Popover>
  );
};

export default DateSelectInput;
