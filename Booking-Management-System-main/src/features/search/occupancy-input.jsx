import { Button } from '@/components/ui/button';
import { FormControl, FormField } from '@/components/ui/form';
import Icon from '@/components/ui/icon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import React from 'react';

const OccupancyInput = ({ form }) => {
  const roomsCount = form.watch('roomsCount') ?? 1;

  function updateRoomsCount(nextValue) {
    form.setValue('roomsCount', Math.max(1, nextValue));
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex h-full items-center gap-2 rounded bg-background px-4 py-2 lg:min-w-[220px]">
          <Icon
            icon="user"
            size="24"
            className="shrink-0 text-muted-foreground"
          />
          <FormField
            control={form.control}
            name="roomsCount"
            render={({ field }) => (
              <FormControl>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-between gap-2 text-left"
                >
                  <span className="text-sm">{field.value || 1} room</span>
                  <Icon
                    icon="dropdown"
                    size="18"
                    className="text-muted-foreground"
                  />
                </button>
              </FormControl>
            )}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[260px] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-medium">Rooms</p>
            <p className="text-sm text-muted-foreground">
              Choose how many rooms you need
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={() => updateRoomsCount(roomsCount - 1)}
              disabled={roomsCount <= 1}
            >
              <Icon icon="minus" size="16" />
            </Button>
            <span className="min-w-6 text-center font-medium">{roomsCount}</span>
            <Button
              type="button"
              size="icon-sm"
              variant="outline"
              onClick={() => updateRoomsCount(roomsCount + 1)}
            >
              <Icon icon="plus" size="16" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OccupancyInput;
