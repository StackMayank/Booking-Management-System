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
