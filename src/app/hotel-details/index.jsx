import React from 'react';
import PropertyViewCarousel from './property-view-carousel';
import HotelMetaDetails from './hotel-meta-details';
import HotelRoomPicker from './hotel-rooms-picker';
import HotelPolicy from './hotel-policy';
import { HotelCheckoutCard } from './hotel-checkout-card';
import { HOTEL_DATA, HOTEL_INFO } from './hotel-details-dummy-data';
import useGetHotelInfo from './hooks/use-get-hotel-details';
import { LoadingSpinner } from '@/components/ui/loader';

const HotelDetails = () => {
  const { data: hotelData, pending, error } = useGetHotelInfo();

  console.log(pending, hotelData);

  const hotelInfo = HOTEL_INFO;

  if (pending)
    return <LoadingSpinner containerClassName={'min-h-[calc(100vh-200px)]'} />;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4 md:mt-6 mb-8 md:mb-12">
      <PropertyViewCarousel images={hotelData.hotel.photos} />
      <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mt-4 md:mt-6">
        <div className="flex-1 space-y-6 md:space-y-8">
          <HotelMetaDetails hotel={hotelData.hotel} info={hotelInfo} />
          <HotelRoomPicker rooms={hotelData.rooms} />
          <HotelPolicy hotelPolicy={hotelInfo.hotelPolicy} />
        </div>
        <aside className="w-full lg:w-[340px] shrink-0 p-3 md:p-4 border border-border shadow-md rounded-xl lg:sticky lg:top-6 lg:h-min">
          <HotelCheckoutCard
            rooms={hotelData.rooms}
            cancellationPolicy={hotelInfo.cancellationPolicy}
          />
        </aside>
      </div>
    </div>
  );
};

export default HotelDetails;
