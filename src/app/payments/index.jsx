import usePollPaymentStatus from './hooks/use-poll-payment-status';
import { BOOKING_STATUS } from '@/config/payment.config';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

const PaymentStatus = () => {
  const { paymentStatus } = usePollPaymentStatus();

  const getStatusConfig = () => {
    switch (paymentStatus) {
      case BOOKING_STATUS.CONFIRMED:
        return {
          icon: <CheckCircle2 size={64} className="text-green-500" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-100',
          title: 'Booking Confirmed!',
          message: 'Your payment was successful. Get ready for your trip.',
          action: (
            <Button asChild className="rounded-full bg-brand px-8 h-12">
              <Link to="/me/booking-history" className="flex items-center gap-2">
                View My Bookings <ChevronRight size={18} />
              </Link>
            </Button>
          )
        };
      case BOOKING_STATUS.ERROR:
      case BOOKING_STATUS.MAX_RETRIES_EXCEEDED:
        return {
          icon: <XCircle size={64} className="text-red-500" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-100',
          title: 'Payment Failed',
          message: 'We couldn\'t process your payment. Please try again or contact support.',
          action: (
            <div className="flex flex-col gap-4 w-full">
              <Button asChild className="rounded-full bg-red-600 hover:bg-red-700 h-12">
                <Link to="/">Try Again</Link>
              </Button>
              <p className="text-xs text-slate-500">
                Need help? <a href="mailto:support@staybooker.com" className="text-brand font-bold">Contact Support</a>
              </p>
            </div>
          )
        };
      case BOOKING_STATUS.PROCESSING:
        return {
          icon: <Clock size={64} className="text-blue-500 animate-pulse" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-100',
          title: 'Processing Payment',
          message: 'Please don\'t close this page. We\'re finalizing your booking.',
          action: <div className="h-12 flex items-center justify-center"><div className="size-6 border-4 border-brand border-t-transparent rounded-full animate-spin"></div></div>
        };
      default:
        return {
          icon: <AlertCircle size={64} className="text-amber-500" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          title: 'Status: ' + paymentStatus,
          message: 'Something went unexpected. Please check your dashboard.',
          action: (
            <Button variant="outline" asChild className="rounded-full h-12">
              <Link to="/">Back to Home</Link>
            </Button>
          )
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50/50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
          {/* Header Branding */}
          <div className="pt-10 pb-6 flex justify-center border-b border-slate-50">
            <div className="flex items-center gap-2">
              <img src="/assets/bookingcom-icon-logo.svg" className="size-8" alt="Logo" />
              <span className="text-xl font-black tracking-tighter text-brand">StayBooker</span>
            </div>
          </div>

          <div className="p-8 sm:p-10 flex flex-col items-center text-center">
            {/* Status Icon with Background */}
            <div className={`${config.bgColor} ${config.borderColor} border size-24 rounded-full flex items-center justify-center mb-8 shadow-inner`}>
              {config.icon}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
              {config.title}
            </h1>
            
            <p className="text-slate-500 text-base leading-relaxed mb-10 max-w-[280px] mx-auto">
              {config.message}
            </p>

            {/* Action Button Area */}
            <div className="w-full">
              {config.action}
            </div>
          </div>

          {/* Footer Decoration */}
          <div className="bg-slate-50 p-4 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
              Secure Transaction by StayBooker
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentStatus;
