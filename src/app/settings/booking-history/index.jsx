import ApiError from '@/components/api-error';
import { LoadingSpinner } from '@/components/ui/loader';
import { Separator } from '@/components/ui/separator';
import BookingCard from './booking-card';
import useGetBookingHistory from './use-get-booking-history';

const BookingHistory = () => {
  const { data, error, pending } = useGetBookingHistory();

  if (error) {
    return <ApiError errorMessage={error} className="min-h-[40vh]" />;
  }

  if (pending) {
    return <LoadingSpinner />;
  }

  const bookings = data ?? [];

  return (
    <section className="min-w-0">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          My Booking History
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          View, update, or cancel your bookings with ease.
        </p>
      </div>
      <Separator className="mt-4 mb-5 sm:mb-6" />
      {bookings.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-12 rounded-lg border border-dashed bg-muted/30">
          No bookings yet. When you book a stay, it will appear here.
        </p>
      ) : (
        <ul className="space-y-4 sm:space-y-5 list-none p-0 m-0">
          {bookings.map((booking) => (
            <li key={booking.id}>
              <BookingCard {...booking} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default BookingHistory;
