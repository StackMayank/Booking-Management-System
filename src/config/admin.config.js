export const ADMIN_SIDEBAR = [
  {
    id: '1',
    label: 'Overview',
    to: ({ hotelId }) => `/admin/hotels/${hotelId}/overview`,
    logo: 'dashboard',
  },
  {
    id: '2',
    label: 'Bookings',
    to: ({ hotelId }) => `/admin/hotels/${hotelId}/bookings`,
    logo: 'calendar',
  },
  {
    id: '3',
    label: 'Rooms',
    to: ({ hotelId }) => `/admin/hotels/${hotelId}/rooms`,
    logo: 'hotel',
  },
];

export const SEARCH_PARAMS_KEYS = {
  DURATION: 'duration',
};

export const DURATION_FILTER_OPTIONS = [
  {
    label: '7 days',
    value: 7,
  },
  {
    label: '30 days',
    value: 30,
  },
  {
    label: '90 days',
    value: 90,
  },
  {
    label: '1 year',
    value: 365,
  },
];

