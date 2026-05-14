import { FormControl, FormField } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DESTINATIONS } from '@/config/app.config';

import React, { useState } from 'react';

const LocationInput = ({ form }) => {
  const city = form.watch('city');
  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  function citySelectHandler(e, index) {
    e.preventDefault();
    const selectedDestination = DESTINATIONS[index];
    form.setValue('city', selectedDestination?.city || '');
    setIsPopOverOpen(false);
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowUp':
        console.log('Up');
        break;
      case 'ArrowDown':
        console.log('Down');
        break;
    }
  }

  return (
    <Popover open={isPopOverOpen} onOpenChange={setIsPopOverOpen}>
      <PopoverTrigger asChild>
        <div className="group flex flex-1 cursor-pointer flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-muted/40 lg:min-h-[56px] lg:min-w-0 lg:flex-[1_1_calc((100%-152px)/3)]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Destination
          </span>
          <div className="flex min-h-[40px] flex-1 items-center gap-3">
            <Icon
              icon="location"
              size="24"
              className="text-muted-foreground shrink-0 transition-transform group-hover:scale-105"
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormControl>
                  <Input
                    className="h-auto min-h-0 w-full border-0 bg-transparent p-0 text-sm font-medium text-foreground shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:font-normal placeholder:text-muted-foreground"
                    placeholder="Where are you going?"
                    {...field}
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                  />
                </FormControl>
              )}
            />
            <div
              role="button"
              className={city ? '' : 'opacity-0 pointer-events-none'}
              onClick={(e) => {
                e.preventDefault();
                form.setValue('city', '');
              }}
              aria-label="Clear the city Input"
            >
              <Icon
                icon="close"
                size="18"
                className="text-muted-foreground shrink-0"
              />
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        sideOffset={-68}
        align="start"
        avoidCollisions={false}
        className="w-[min(100vw-2rem,300px)] sm:w-[min(100vw-2rem,420px)] overflow-hidden rounded-xl border border-border p-0 shadow-xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="border-b border-border bg-muted/30 px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Popular destinations
          </p>
          <p className="text-sm font-semibold text-foreground">Nearby picks</p>
        </div>
        <div className="scrollbar max-h-[300px] overflow-y-auto">
          {DESTINATIONS.map((destination, index) => (
            <div
              key={index}
              className="flex cursor-pointer items-center gap-3 border-b border-border px-4 py-3 transition-colors duration-200 last:border-b-0 hover:bg-accent"
              onClick={(e) => citySelectHandler(e, index)}
            >
              <Icon icon="location" />
              <div>
                <p className="text-sm font-semibold">{destination.city}</p>
                <p className="text-sm text-muted-foreground">
                  {destination.country}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationInput;
