import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import API_CONFIG from '@/config/api.config';
import { PATHS } from '@/config/path.config';
import useMutation from '@/lib/hooks/useMutation';
import React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function getPaymentRedirectPath(response, bookingId) {
  const payload = response?.data ?? response;
  if (payload?.sessionUrl) {
    return payload.sessionUrl;
  }
  const id = payload?.id ?? bookingId;
  if (id != null) {
    return PATHS.paymentStatus(id);
  }
  return null;
}

const InitiatePaymentsButton = ({ id }) => {
  const navigate = useNavigate();
  const { mutate, pending } = useMutation(
    API_CONFIG.BOOKING.PAYMENT_BOOKING.URL(id),
    API_CONFIG.BOOKING.PAYMENT_BOOKING.METHOD
  );

  const initiatePayment = () => {
    if (id == null) {
      toast('Error', {
        type: 'error',
        description: 'Booking is not ready for payment. Please refresh the page.',
      });
      return;
    }

    mutate(null, {
      onSuccess: (response) => {
        const redirectPath = getPaymentRedirectPath(response, id);
        if (!redirectPath) {
          toast('Error', {
            type: 'error',
            description: 'Payment redirect URL is missing. Please try again.',
          });
          return;
        }
        navigate(redirectPath);
      },
      onError: (error) => {
        toast('Error: ' + error.status, {
          type: 'error',
          description: error.message,
        });
      },
    });
  };

  return (
    <Button
      onClick={initiatePayment}
      size="lg"
      disabled={pending || id == null}
      className="w-full h-12 shadow-lg uppercase text-base font-semibold transition-opacity bg-green-600 hover:bg-green-700"
    >
      <Icon size="30" icon="shield" />
      Proceed to Pay
    </Button>
  );
};

export default InitiatePaymentsButton;
