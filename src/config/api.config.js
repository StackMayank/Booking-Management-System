const API_CONFIG = {
  HOTEL: {
    BROWSE_HOTELS: '/hotels/search',
    HOTEL_INFO: {
      URL: (hotelId) => `/hotels/${hotelId}/info`,
    },
  },
  AUTH: {
    SIGN_IN: '/auth/login',
    SIGN_UP: '/auth/signup',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/users/profile',
  },
  BOOKING: {
    INIT_BOOKING: {
      METHOD: 'POST',
      URL: '/bookings/init',
    },
    ADD_GUEST: {
      METHOD: 'POST',
      URL: (bookingId) => `/bookings/${bookingId}/addGuests`,
    },
    PAYMENT_BOOKING: {
      METHOD: 'POST',
      URL: (bookingId) => `/bookings/${bookingId}/payments`,
    },
    STATUS_BOOKING: {
      METHOD: 'GET',
      URL: (bookingId) => `/bookings/${bookingId}/status`,
    },
    CANCEL_BOOKING: {
      METHOD: 'POST',
      URL: (bookingId) => `/bookings/${bookingId}/cancel`,
    },
  },
};

export default API_CONFIG;
