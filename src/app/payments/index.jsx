import usePollPaymentStatus from './hooks/use-poll-payment-status';
import { BOOKING_STATUS } from '@/config/payment.config';
import { Button } from '@/components/ui/button';
import { LoaderMark } from '@/components/ui/loader';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router';

const PaymentStatus = () => {
  const { paymentStatus, isVerifying } = usePollPaymentStatus();

  if (isVerifying) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50 p-4">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 flex flex-col items-center text-center gap-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2"
            >
              <img
                src="/assets/bookingcom-icon-logo.svg"
                className="size-8"
                alt="Logo"
              />
              <span className="text-xl font-black tracking-tighter text-brand">
                StayBooker
              </span>
            </motion.div>
            <LoaderMark className="py-2" />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-2"
            >
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Verifying your payment
              </h1>
              <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">
                Please wait while we confirm your booking. Do not close this
                page.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  const getStatusConfig = () => {
    switch (paymentStatus) {
      case BOOKING_STATUS.CONFIRMED:
        return {
          icon: <CheckCircle2 size={64} className="text-green-500" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-100',
          title: 'Booking Confirmed!',
          message:
            'Your payment was successful. Get ready for your trip.',
          action: (
            <Button asChild className="rounded-full bg-brand px-8 h-12">
              <Link
                to="/me/booking-history"
                className="flex items-center gap-2"
              >
                View My Bookings <ChevronRight size={18} />
              </Link>
            </Button>
          ),
        };
      case BOOKING_STATUS.CANCELLED:
        return {
          icon: <AlertCircle size={64} className="text-amber-500" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          title: 'Payment Cancelled',
          message:
            'Your payment was cancelled. If this was a mistake, please try again.',
          action: (
            <Button variant="outline" asChild className="rounded-full h-12">
              <Link to="/">Back to Home</Link>
            </Button>
          ),
        };
      case BOOKING_STATUS.EXPIRED:
        return {
          icon: <Clock size={64} className="text-slate-500" />,
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-100',
          title: 'Payment Expired',
          message:
            'Your payment session has expired. Please start a new booking.',
          action: (
            <Button variant="outline" asChild className="rounded-full h-12">
              <Link to="/">Back to Home</Link>
            </Button>
          ),
        };
      case BOOKING_STATUS.ERROR:
      case BOOKING_STATUS.MAX_RETRIES_EXCEEDED:
        return {
          icon: <XCircle size={64} className="text-red-500" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-100',
          title: 'Payment Failed',
          message:
            "We couldn't process your payment. Please try again or contact support.",
          action: (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4 w-full"
            >
              <Button
                asChild
                className="rounded-full bg-red-600 hover:bg-red-700 h-12"
              >
                <Link to="/">Try Again</Link>
              </Button>
              <p className="text-xs text-slate-500">
                Need help?{' '}
                <a
                  href="mailto:support@staybooker.com"
                  className="text-brand font-bold"
                >
                  Contact Support
                </a>
              </p>
            </motion.div>
          ),
        };
      default:
        return {
          icon: <AlertCircle size={64} className="text-amber-500" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          title: 'Unable to verify payment',
          message: 'Something went unexpected. Please check your dashboard.',
          action: (
            <Button variant="outline" asChild className="rounded-full h-12">
              <Link to="/me/booking-history">View My Bookings</Link>
            </Button>
          ),
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[70vh] flex items-center justify-center bg-slate-50/50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="pt-10 pb-6 flex justify-center border-b border-slate-50"
          >
            <div className="flex items-center gap-2">
              <img
                src="/assets/bookingcom-icon-logo.svg"
                className="size-8"
                alt="Logo"
              />
              <span className="text-xl font-black tracking-tighter text-brand">
                StayBooker
              </span>
            </div>
          </motion.div>

          <div className="p-8 sm:p-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 260 }}
              className={`${config.bgColor} ${config.borderColor} border size-24 rounded-full flex items-center justify-center mb-8 shadow-inner`}
            >
              {config.icon}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight"
            >
              {config.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 text-base leading-relaxed mb-10 max-w-[280px] mx-auto"
            >
              {config.message}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="w-full"
            >
              {config.action}
            </motion.div>
          </div>

          <motion.div className="bg-slate-50 p-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
              Secure Transaction by StayBooker
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PaymentStatus;
