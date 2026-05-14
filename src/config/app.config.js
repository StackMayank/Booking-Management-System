export const SERVICE_LIST = [
  {
    id: 1,
    title: 'Stays',
    icon: 'bed',
    active: true,
  },
  {
    id: 2,
    title: 'Flights',
    icon: 'flight',
  },
  {
    id: 4,
    title: 'Car rentals',
    icon: 'car',
  },
  {
    id: 5,
    title: 'Attractions',
    icon: 'attraction',
  },
  {
    id: 6,
    title: 'Airport taxis',
    icon: 'taxi',
  },
];
export const HOTEL_TIMINGS = {
  CHECKIN: '12:00 PM',
  CHECKOUT: '11:00 AM',
};

export const TRENDING_DESTINATIONS = [
  {
    title: 'New Delhi',
    image: 'delhi.jpg',
    className: 'sm:col-span-3 sm:col-start-1 col-span-full',
  },
  {
    title: 'Bangalore',
    image: 'bangalore.jpg',
    className: 'sm:col-span-3 sm:col-start-4 col-span-full',
  },
  {
    title: 'Mumbai',
    image: 'mumbai.jpg',
    className: 'md:col-span-2 md:col-start-1 col-span-full',
  },
  {
    title: 'Chennai',
    image: 'chennai.jpg',
    className: 'md:col-span-2 md:col-start-3 sm:col-span-3 col-span-full',
  },
  {
    title: 'Hyderabad',
    image: 'hyderabad.jpg',
    className: 'md:col-span-2 md:col-start-5 sm:col-span-3 col-span-full',
  },
];

export const FOOTER_SECTION = [
  {
    title: 'Company',
    links: [
      { text: 'About Us', href: '#' },
      { text: 'Careers', href: '#' },
      { text: 'Press', href: '#' },
      { text: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { text: 'Help Center', href: '#' },
      { text: 'Safety Info', href: '#' },
      { text: 'Cancellation', href: '#' },
      { text: 'Contact Us', href: '#' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { text: 'Destinations', href: '#' },
      { text: 'Deals', href: '#' },
      { text: 'Reviews', href: '#' },
      { text: 'Travel Guides', href: '#' },
    ],
  },
  {
    title: 'Hosting',
    links: [
      { text: 'List Your Property', href: '#' },
      { text: 'Host Resources', href: '#' },
      { text: 'Community', href: '#' },
      { text: 'Responsible Hosting', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { text: 'Privacy Policy', href: '#' },
      { text: 'Terms of Service', href: '#' },
      { text: 'Cookie Policy', href: '#' },
      { text: 'Accessibility', href: '#' },
    ],
  },
];


export const SOCIAL_LINKS = [
  { icon: 'facebook', href: '#', title: 'Facebook' },
  { icon: 'twitter', href: '#', title: 'Twitter' },
  { icon: 'instagram', href: '#', title: 'Instagram' },
  { icon: 'youtube', href: '#', title: 'Youtube' },
  { icon: 'linkedin', href: '#', title: 'LinkedIn' },
];

export const DESTINATIONS = [
  { city: 'Jaipur', country: 'India' },
  { city: 'Delhi', country: 'India' },
  { city: 'Goa', country: 'India' },
  { city: 'Gurgaon', country: 'India' },
  { city: 'North Goa', country: 'India' },
  { city: 'Mumbai', country: 'India' },
  { city: 'Bangalore', country: 'India' },
  { city: 'Hyderabad', country: 'India' },
  { city: 'Chennai', country: 'India' },
  { city: 'Pune', country: 'India' }
];

export const SEARCH_RESULT_PAGE_LIMIT = 5;

export const SEARCH_PARAMS_KEYS = {
  CHECKIN: 'startDate',
  CHECKOUT: 'endDate',
  ROOMS: 'roomsCount',
  LOCATION: 'city',
  SELECTED_ROOM: 'selected_rcid',
  SORTBY: 'sort',
  PAGE: 'page',
  STAR_CATEGORY: 'star-category',
  PRICE_RANGE: 'price-range',
  NEXT_REDIRECT: 'next',
};

export const SEARCH_FILTER_LABEL_KEY = {
  popularity: 'Our top picks',
  'price-asc': 'Price (lowest first)',
  'price-desc': 'Price (highest first)',
};
export const SEARCH_FILTERS = [
  {
    label: 'Our top picks',
    value: 'popularity',
  },
  {
    label: 'Price (lowest first)',
    value: 'price-asc',
  },
  {
    label: 'Price (highest first)',
    value: 'price-desc',
  },
];
export const STAR_FILTERS = [
  {
    id: 1,
    label: '5 Star',
    value: 5,
  },
  {
    id: 2,
    label: '4 Star',
    value: 4,
  },
  {
    id: 3,
    label: '3 Star',
    value: 3,
  },
  {
    id: 4,
    label: '2 Star',
    value: 2,
  },
  {
    id: 5,
    label: '1 Star',
    value: 1,
  },
];
export const PRICE_FILTERS = [
  {
    id: 1,
    label: '₹0 - ₹500',
    value: '0-500',
  },
  {
    id: 2,
    label: '₹500 - ₹1000',
    value: '500-1000',
  },
  {
    id: 3,
    label: '₹1000 - ₹1500',
    value: '1000-1500',
  },
  {
    id: 4,
    label: '₹1500 - ₹2000',
    value: '1500-2000',
  },
  {
    id: 5,
    label: '₹2000 - ₹2500',
    value: '2000-2500',
  },
];
export const ERROR_FALLBACK = {
  TITLE: 'Internal Server Error',
  DESCRIPTION: 'Something went wrong. Please try again later.',
};
export const bookingStatusVariant = {
  CONFIRMED: {
    className: 'border-green-600 bg-green-100 text-green-600',
    text: 'Completed',
  },
  CANCELLED: {
    className: 'border-red-600 bg-red-100 text-red-600',
    text: 'Cancelled',
  },
  PAYMENTS_PENDING: {
    className: 'border-amber-600 bg-amber-100 text-amber-600',
    text: 'Pending',
  },
};
