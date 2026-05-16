import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Icon from '@/components/ui/icon';
import { HOTEL_TIMINGS, bookingStatusVariant } from '@/config/app.config';
import { cn, getDefaultProfile } from '@/lib/utils';
import dayjs from 'dayjs';

const BookingGuestList = ({ guests }) => {
  return (
    <HoverCard openDelay={100}>
      <HoverCardTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1 min-h-[44px] sm:min-h-0"
          aria-label={`${guests.length} guests, view guest list`}
        >
          <span className="text-sm font-medium">{guests.length}</span>
          <Icon icon="info" size="16" className="shrink-0 text-primary" />
        </button>
      </HoverCardTrigger>
      <HoverCardContent
        align="center"
        side="bottom"
        className="w-[min(350px,calc(100vw-2.5rem))] space-y-3"
        role="tooltip"
      >
        <h3 className="text-base font-semibold">Guest List</h3>
        <ul className="space-y-3">
          {guests.map((guest, index) => (
            <li key={index}>
              <div className="flex items-center gap-2">
                <Avatar className="size-9">
                  <AvatarImage
                    loading="lazy"
                    src={getDefaultProfile(guest.name.charAt(0))}
                    alt=""
                  />
                  <AvatarFallback>
                    {guest?.name?.charAt(0) ?? '?'}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium truncate">{guest.name}</h3>
                  <p className="text-xs capitalize text-muted-foreground">
                    {guest.gender}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
};

const BookingDateBlock = ({ label, time, date }) => (
  <div className="flex flex-col gap-1 min-w-0">
    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
      {label}
    </span>
    <p className="text-base font-semibold leading-tight">{time}</p>
    <p className="text-sm font-medium text-muted-foreground leading-snug break-words">
      {date}
    </p>
  </div>
);

const BookingCard = ({
  hotel,
  roomsCount,
  checkInDate,
  checkOutDate,
  bookingStatus,
  guests,
  amount,
  id,
}) => {
  const status = bookingStatusVariant[bookingStatus];

  return (
    <article className="border border-border rounded-lg overflow-hidden bg-background shadow-sm">
      <header className="p-4 sm:p-5 space-y-2 border-b border-border">
        <h2 className="text-lg sm:text-xl font-semibold leading-snug break-words">
          {hotel?.name || 'Hotel stay'}
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
          <p className="text-sm font-medium text-muted-foreground break-all">
            {`Booking ID - ${id}`}
          </p>
          {status && (
            <Badge
              className={cn(
                'w-fit text-white px-2 py-0.5 text-xs sm:text-sm',
                status.className
              )}
            >
              {status.text}
            </Badge>
          )}
        </div>
      </header>

      <div className="p-4 sm:p-5 border-b border-border space-y-4 sm:space-y-0 sm:flex sm:items-start sm:justify-between sm:gap-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1 min-w-0">
          <BookingDateBlock
            label="Check in"
            time={HOTEL_TIMINGS.CHECKIN}
            date={dayjs(checkInDate).format('ddd, DD MMM YYYY')}
          />
          <BookingDateBlock
            label="Check out"
            time={HOTEL_TIMINGS.CHECKOUT}
            date={dayjs(checkOutDate).format('ddd, DD MMM YYYY')}
          />
        </div>
        <div className="flex flex-wrap gap-4 sm:flex-col sm:gap-3 sm:shrink-0 sm:pt-0.5">
          <div className="flex items-center gap-2 min-w-0">
            <Icon icon="room" size={20} className="shrink-0" />
            <p className="text-sm font-medium">
              {`${roomsCount} ${roomsCount > 1 ? 'Rooms' : 'Room'}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="travelers" size={20} className="shrink-0" />
            <BookingGuestList guests={guests ?? []} />
          </div>
        </div>
      </div>

      <footer className="px-4 sm:px-5 py-3 sm:py-4 bg-blue-50/80">
        <p className="text-base font-semibold">{`Paid - ₹${amount?.toLocaleString?.() ?? amount}`}</p>
      </footer>
    </article>
  );
};

export default BookingCard;
