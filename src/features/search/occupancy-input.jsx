import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';

const OccupancyInput = ({ form }) => {
  const rooms = form.watch('roomsCount');
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="group flex h-full min-w-0 flex-1 cursor-pointer flex-col gap-1 px-4 py-3 transition-colors hover:bg-muted/40 lg:min-h-[56px] lg:flex-[1_1_calc((100%-152px)/3)] border-t border-yellow-300/70 lg:border-t-0 lg:border-l"
          role="button"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Rooms
          </span>
          <div className="flex min-h-[40px] items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Icon
                icon="user"
                size="24"
                className="text-muted-foreground shrink-0 transition-transform group-hover:scale-105"
              />
              <p className="text-sm font-semibold text-foreground">
                {rooms} rooms
              </p>
            </div>
            <Icon
              icon="dropdown"
              size="18"
              className="text-muted-foreground shrink-0 opacity-80"
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={-68}
        align='start'
        avoidCollisions={false}
        className="w-64 sm:w-80 overflow-hidden rounded-xl border border-border p-0 shadow-xl"
      >
        <FormField
          control={form.control}
          name="roomsCount"
          render={({ field }) => (
            <div className="p-4">
              <FormItem className="flex items-center justify-between gap-4 space-y-0">
                <FormLabel className="text-base font-semibold">Rooms</FormLabel>
                <FormControl>
                  <div className="flex items-center overflow-hidden rounded-full border border-border bg-muted/40">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-10 rounded-none text-primary hover:bg-background hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={field.value <= 1}
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(Math.max(1, field.value - 1));
                      }}
                    >
                      <Icon icon="minus" />
                    </Button>
                    <span className="min-w-8 text-center text-sm font-semibold tabular-nums">
                      {field.value}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="size-10 rounded-none text-primary hover:bg-background hover:text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        field.onChange(field.value + 1);
                      }}
                    >
                      <Icon icon="plus" />
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            </div>
          )}
        />
      </PopoverContent>
    </Popover>
  );
};

export default OccupancyInput;
