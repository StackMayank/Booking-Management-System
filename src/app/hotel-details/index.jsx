import React from 'react';
import PropertyViewCarousel from './property-view-carousel';
import {
  HotelDetailsHeader,
  HotelAmenitiesSection,
  HotelAboutSection,
} from './hotel-meta-details';
import HotelRoomPicker from './hotel-rooms-picker';
import HotelPolicy from './hotel-policy';
import { HotelCheckoutCard } from './hotel-checkout-card';
import { HOTEL_INFO } from './hotel-details-dummy-data';
import useGetHotelInfo from './hooks/use-get-hotel-details';
import { LoadingSpinner } from '@/components/ui/loader';

const checkoutCardAsideClassName =
  'w-full shrink-0 p-3 md:p-4 border border-border shadow-md rounded-xl';

const HotelDetails = () => {
  const { data: hotelData, pending, error } = useGetHotelInfo();

  const hotelInfo = HOTEL_INFO;

  if (pending)
    return <LoadingSpinner containerClassName={'min-h-[calc(100vh-200px)]'} />;

  if (error) return <p>Error: {error.message}</p>;

  const checkoutCardProps = {
    rooms: hotelData.rooms,
    cancellationPolicy: hotelInfo.cancellationPolicy,
  };

  return (
    <div className="container hotel-details-page mt-4 md:mt-6 mb-8 md:mb-12">
      <PropertyViewCarousel images={hotelData.hotel.photos} />
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
        <div className="flex-1 flex flex-col gap-6 md:gap-8 min-w-0">
          <HotelDetailsHeader hotel={hotelData.hotel} />

          {/* Mobile: pricing card before amenities */}
          <aside className={`lg:hidden ${checkoutCardAsideClassName}`}>
            <HotelCheckoutCard {...checkoutCardProps} />
          </aside>

          <HotelAmenitiesSection hotel={hotelData.hotel} />
          <HotelAboutSection info={hotelInfo} />
          <HotelRoomPicker rooms={hotelData.rooms} />
          <HotelPolicy hotelPolicy={hotelInfo.hotelPolicy} />
        </div>

        {/* Desktop: sticky sidebar (unchanged position) */}
        <aside
          className={`hidden lg:block lg:w-[340px] lg:sticky lg:top-6 lg:h-min ${checkoutCardAsideClassName}`}
        >
          <HotelCheckoutCard {...checkoutCardProps} />
        </aside>
      </div>
    </div>
  );
};

export default HotelDetails;
