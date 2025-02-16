import React from 'react'
import PropertyViewCarousel from './property-view-carousel'
import HotelMetaDetails from './hotel-meta-details'
import HotelRoomPicker from './hotel-rooms-picker'
import HotelPolicy from './hotel-policy'
import { HotelCheckoutCard } from './hotel-checkout-card'
import { HOTEL_DATA, HOTEL_INFO } from './hotel-details-dummy-data'

const HotelDetails = () => {

  const hotelData = HOTEL_DATA;
  const hotelInfo = HOTEL_INFO;

  return (
    <div className="container mt-6 mb-12">
      <PropertyViewCarousel images={hotelData.hotel.photos} />
      <div className='flex gap-6 mt-6'>
        <div className='flex-1 space-y-8'>
          <HotelMetaDetails hotel={hotelData.hotel} info={hotelInfo}/>
          <HotelRoomPicker rooms={hotelData.rooms}/>
          <HotelPolicy hotelPolicy={hotelInfo.hotelPolicy}/>
        </div>
        <aside className='w-[340px] shrink-0 p-4 border border-border shadow-md rounded-xl sticky top-6 h-min'>
          <HotelCheckoutCard rooms={hotelData.rooms} cancellationPolicy={hotelInfo.cancellationPolicy} />
        </aside>
      </div>
    </div>
  );
}

export default HotelDetails