import { SEARCH_PARAMS_KEYS } from '@/config/app.config';
import { searchFormSchema } from '@/lib/validators/search-form-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';

export default function useSearchForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const defaultValues = useMemo(() => {
    const checkInRaw = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
    const checkOutRaw = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);
    const from =
      checkInRaw && dayjs(checkInRaw).isValid()
        ? dayjs(checkInRaw).toDate()
        : undefined;
    const to =
      checkOutRaw && dayjs(checkOutRaw).isValid()
        ? dayjs(checkOutRaw).toDate()
        : undefined;

    return {
      city: searchParams.get(SEARCH_PARAMS_KEYS.LOCATION) || '',
      roomsCount: parseInt(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS), 10) || 1,
      bookingDates: { from, to },
    };
  }, [searchParams]);

  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);

  function searchSubmitHandler(data) {
    const sendData = {
      city: data.city,
      roomsCount: data.roomsCount,
      startDate: dayjs(data.bookingDates.from).format('YYYY-MM-DD'),
      endDate: dayjs(data.bookingDates.to).format('YYYY-MM-DD'),
    };
    console.log('Search data', sendData);
    const params = new URLSearchParams(sendData);
    navigate(`/search?${params.toString()}`);
  }

  return { form, searchSubmitHandler };
}
