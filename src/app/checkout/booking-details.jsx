import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import dayjs from 'dayjs';
import React from 'react';
import CheckoutGuests from './guests/checkout-guests';

const BookingDateBlock = ({ label, dateString }) => {
  const date = dayjs(dateString);

  return (
    <div
      className="flex flex-col gap-1 min-w-0 items-center text-center"
      role="group"
      aria-label={`${label}: ${date.format('dddd, D MMMM YYYY')}`}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="flex flex-col leading-none gap-0.5 items-center text-center">
        <span className="text-sm text-muted-foreground capitalize">
          {date.format('ddd')}
        </span>
        <span className="text-2xl font-bold tabular-nums tracking-tight">
          {date.format('DD')}
        </span>
        <p className="text-sm leading-snug pt-0.5 m-0">
          <span className="font-semibold">{date.format('MMM')}</span>
          <span className="text-muted-foreground"> {date.format('YYYY')}</span>
        </p>
      </div>
    </div>
  );
};

const BookingDetails = ({ booking }) => {
  return (
    <section className="space-y-4">
      <div className="flex gap-2 px-4">
        <div className="shrink-0">
          <img
            width={130}
            height={85}
            src={booking.hotel.photos[0]}
            alt={booking.hotel.name}
            className="rounded-lg w-[100px] sm:w-[130px] h-auto object-cover"
          />
        </div>
        <div className="flex-1 min-w-0 space-y-1">
          <h2 className="text-base font-semibold leading-snug">
            {booking.hotel.name}
          </h2>
          <p className="text-sm text-muted-foreground leading-snug">
            {booking.hotel.contactInfo.address}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded bg-brand shrink-0">
              <span className="text-xs font-medium text-white">4.3</span>
              <Icon
                icon="star"
                aria-label="rating"
                size="10"
                className="text-white mb-0.5"
              />
            </div>
            <div className="flex items-center gap-1 text-xs">
              <p>(631 Ratings)</p>
              <span>·</span>
              <p>Excellent</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch border-dashed border-y border-y-blue-100">
        <div
          aria-label="check-in and check-out dates"
          className="grid grid-cols-2 flex-1 gap-4 sm:gap-6 p-4 bg-blue-50/40"
        >
          <BookingDateBlock label="Check in" dateString={booking.checkInDate} />
          <BookingDateBlock label="Check out" dateString={booking.checkOutDate} />
        </div>
        <div className="flex items-center justify-center flex-1 gap-1.5 p-4 bg-blue-50/40 border-t sm:border-t-0 sm:border-l border-blue-100/80">
          <p className="text-sm font-medium text-center">
            <span className="text-base font-semibold">{booking?.roomsCount}</span>
            {booking?.roomsCount > 1 ? ' Rooms' : ' Room'}
          </p>
          <span className="text-muted-foreground" aria-hidden>
            |
          </span>
          <p className="text-sm font-medium">{booking.room.type}</p>
        </div>
      </div>

      <Separator />
      <CheckoutGuests guests={booking.guests || []} bookingId={booking.id} />
      <div className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Total Price</span>
          <p className="text-base font-bold">{`₹${booking.amount.toLocaleString()}`}</p>
        </div>
      </div>
    </section>
  );
};

export default BookingDetails;
