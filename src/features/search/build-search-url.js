import dayjs from 'dayjs';
import {
  HERO_HOLIDAY_RENTAL_SEARCH,
  SEARCH_PARAMS_KEYS,
  SEARCH_ROUTE_PATH,
} from '@/config/app.config';

export function buildHotelSearchParams({
  city,
  roomsCount = 1,
  startDate,
  endDate,
} = {}) {
  const params = new URLSearchParams();

  if (city) {
    params.set(SEARCH_PARAMS_KEYS.LOCATION, city);
  }
  params.set(SEARCH_PARAMS_KEYS.ROOMS, String(roomsCount));
  if (startDate) {
    params.set(SEARCH_PARAMS_KEYS.CHECKIN, startDate);
  }
  if (endDate) {
    params.set(SEARCH_PARAMS_KEYS.CHECKOUT, endDate);
  }

  return params;
}

export function buildHotelSearchPath(searchInput) {
  const params =
    searchInput instanceof URLSearchParams
      ? searchInput
      : buildHotelSearchParams(searchInput);
  const query = params.toString();
  return query ? `${SEARCH_ROUTE_PATH}?${query}` : SEARCH_ROUTE_PATH;
}

/** Hero CTA: Delhi, today → +7 nights, 1 room */
export function getHeroHolidayRentalSearchPath() {
  const { city, roomsCount, checkInOffsetDays, stayNights } =
    HERO_HOLIDAY_RENTAL_SEARCH;
  const checkIn = dayjs().startOf('day').add(checkInOffsetDays, 'day');
  const checkOut = checkIn.add(stayNights, 'day');

  return buildHotelSearchPath({
    city,
    roomsCount,
    startDate: checkIn.format('YYYY-MM-DD'),
    endDate: checkOut.format('YYYY-MM-DD'),
  });
}
