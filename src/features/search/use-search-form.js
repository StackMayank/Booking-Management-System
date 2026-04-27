import { SEARCH_PARAMS_KEYS } from "@/config/app.config";
import { searchFormSchema } from "@/lib/validators/search-form-validator";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";

export default function useSearchForm() {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      city: searchParams.get(SEARCH_PARAMS_KEYS.LOCATION) || '',
      roomsCount: parseInt(searchParams.get(SEARCH_PARAMS_KEYS.ROOMS)) || 1,
      bookingDates: {
        from: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN)).toDate(),
        to: dayjs(searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT)).toDate(),
      },
    },
  });

  function searchSubmitHandler(data) {
    const sendData = {
      city: data.city,
      roomsCount: data.roomsCount,
      startDate: dayjs(data.bookingDates.from).format('YYYY-MM-DD'),
      endDate: dayjs(data.bookingDates.to).format('YYYY-MM-DD'),
    };
    console.log('Search data', sendData);
    const params = new URLSearchParams(sendData);
    navigate(`/search?${params.toString()}`)
  }

  return {form, searchSubmitHandler};
}