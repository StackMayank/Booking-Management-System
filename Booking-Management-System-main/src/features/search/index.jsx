import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import LocationInput from './location-input';
import DateSelectInput from './date-select-input';
import OccupancyInput from './occupancy-input';
import { Button } from '@/components/ui/button';

const Search = () => {
  const form = useForm({
    defaultValues: {
      city: '',
      bookingDates: { from: null, to: null },
      roomsCount: 1,
    },
  });

  function onSubmit(data) {
    console.log('Search data ', data);
  }

  return (
   <section className='container'>
      <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-1 bg-yellow-500 lg:flex-row lg:items-center rounded h-14 p-1'>
            
            <LocationInput form={form}/>
            <DateSelectInput form={form}/>
            <OccupancyInput form={form}/>
            <Button type="submit" className="text-lg h-full">
              Search
            </Button>

            </form>
      </Form>
   </section>
  );
};

export default Search;
