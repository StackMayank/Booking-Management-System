import API_CONFIG from '@/config/api.config';
import {
  SEARCH_PARAMS_KEYS,
  SEARCH_RESULT_PAGE_LIMIT,
} from '@/config/app.config';
import useQuery from '@/lib/hooks/useQuery';
import { useSearchParams } from 'react-router';

function useGetHotels() {
  const [searchParams] = useSearchParams();

  const city = searchParams.get(SEARCH_PARAMS_KEYS.LOCATION)?.trim();
  const startDate = searchParams.get(SEARCH_PARAMS_KEYS.CHECKIN);
  const endDate = searchParams.get(SEARCH_PARAMS_KEYS.CHECKOUT);
  const roomsCount = searchParams.get(SEARCH_PARAMS_KEYS.ROOMS) || '1';

  const canSearch = Boolean(city && startDate && endDate);

  const { data, pending, error } = useQuery({
    url: API_CONFIG.HOTEL.BROWSE_HOTELS,
    enabled: canSearch,
    options: {
      params: {
        city,
        startDate,
        endDate,
        roomsCount,
        page: (searchParams.get(SEARCH_PARAMS_KEYS.PAGE) || 1) - 1,
        size: SEARCH_RESULT_PAGE_LIMIT,
      },
    },
  });

  return { data, pending, error, city, canSearch };
}

export default useGetHotels;
