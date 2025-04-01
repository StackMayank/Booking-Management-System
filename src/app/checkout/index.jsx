import React from 'react'
import useInitCheckout from './hooks/use-init-checkout'
import { Separator } from '@/components/ui/separator';
import BookingDetails from './booking-details';
import InitiatePaymentsButton from './init-payments-button';

const CheckoutPage = () => {

  const {data, pending, error} = useInitCheckout();

  console.log(error)

  if(pending) {
    return <p>Loading...</p>;
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  return (
    <div className="container flex items-center my-20">
      <div className="flex-1 max-w-2xl py-4 mx-auto border border-border shadow-lg rounded-xl bg-background">
        <div className="px-4">
          <h1 className="text-xl font-bold">Booking Checkout</h1>
        </div>
        <Separator className="my-4" />
        <BookingDetails booking={data || {}} />
        <div className="px-4 mt-6">
          <InitiatePaymentsButton id={data.id} />
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage