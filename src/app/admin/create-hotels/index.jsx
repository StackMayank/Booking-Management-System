import React from 'react'
import CreateHotelForm from './create-hotel-form';

const CreateHotel = () => {
  return (
    <div className="container py-4 space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold">Create Hotel</h1>
        <p className="text-sm text-muted-foreground">
          Fill hotel information to create new hotel
        </p>
      </div>
      <CreateHotelForm />
    </div>
  );
}

export default CreateHotel