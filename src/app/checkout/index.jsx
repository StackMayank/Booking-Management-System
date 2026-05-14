import React from 'react'
import useInitCheckout from './hooks/use-init-checkout'
import { Separator } from '@/components/ui/separator';
import BookingDetails from './booking-details';
import InitiatePaymentsButton from './init-payments-button';
import { LoadingSpinner } from '@/components/ui/loader';
import ApiError from '@/components/api-error';

const CheckoutPage = () => {

  const {data, pending, error} = useInitCheckout();

  if(pending) {
    return <LoadingSpinner containerClassName={'min-h-[calc(100vh-200px)]'} />;
  }

  if(error) {
    console.log(error);
    return (
      <ApiError
        errorMessage={error}
        className="h-[calc(100vh-200px)]"
      />
    );
  }

  return (
    <div className="container flex items-center my-8 md:my-20 px-2 sm:px-4">
      <div className="flex-1 max-w-2xl py-3 md:py-4 mx-auto border border-border shadow-lg rounded-lg md:rounded-xl bg-background w-full">
        <div className="px-3 md:px-4">
          <h1 className="text-lg md:text-xl font-bold">Booking Checkout</h1>
        </div>
        <Separator className="my-3 md:my-4" />
        <BookingDetails booking={data || {}} />
        <div className="px-3 md:px-4 mt-4 md:mt-6">
          <InitiatePaymentsButton id={data.id} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage