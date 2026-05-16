import API_CONFIG from '@/config/api.config';
import { BOOKING_STATUS } from '@/config/payment.config';
import axiosInstance from '@/lib/axios-instance';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

const TERMINAL_STATUSES = new Set([
  BOOKING_STATUS.CONFIRMED,
  BOOKING_STATUS.CANCELLED,
  BOOKING_STATUS.EXPIRED,
]);

const MAX_RETRIES = 20;
const POLLING_DELAY_MS = 1500;

function usePollPaymentStatus() {
  const { bookingId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const cancelledRef = useRef(false);

  const fetchBookingStatus = useCallback(async () => {
    const response = await axiosInstance.get(
      API_CONFIG.BOOKING.STATUS_BOOKING.URL(bookingId)
    );
    const booking = response?.data ?? response;
    return booking?.bookingStatus ?? null;
  }, [bookingId]);

  useEffect(() => {
    cancelledRef.current = false;

    if (!bookingId) {
      setPaymentStatus(BOOKING_STATUS.ERROR);
      setIsVerifying(false);
      return;
    }

    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function verifyPayment() {
      setIsVerifying(true);
      setPaymentStatus(null);

      for (let attempt = 0; attempt < MAX_RETRIES; attempt += 1) {
        if (cancelledRef.current) return;

        try {
          const status = await fetchBookingStatus();

          if (status && TERMINAL_STATUSES.has(status)) {
            setPaymentStatus(status);
            setIsVerifying(false);
            return;
          }
        } catch (err) {
          console.error('Payment verification failed:', err);
        }

        if (attempt < MAX_RETRIES - 1 && !cancelledRef.current) {
          await wait(POLLING_DELAY_MS);
        }
      }

      if (!cancelledRef.current) {
        setPaymentStatus(BOOKING_STATUS.ERROR);
        setIsVerifying(false);
      }
    }

    verifyPayment();

    return () => {
      cancelledRef.current = true;
    };
  }, [bookingId, fetchBookingStatus]);

  return { paymentStatus, isVerifying };
}

export default usePollPaymentStatus;
