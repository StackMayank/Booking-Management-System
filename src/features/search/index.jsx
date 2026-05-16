import { Form } from '@/components/ui/form';
import React from 'react';
import LocationInput from './location-input';
import DateSelectInput from './date-select-input';
import OccupancyInput from './occupancy-input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import useSearchForm from './use-search-form';

const Search = () => {

  const {form, searchSubmitHandler} = useSearchForm();

  return (
    <section className="container px-2 sm:px-4">
      <Form {...form}>
        <div className="mx-auto max-w-5xl">
          <div className="rounded-xl sm:rounded-2xl bg-yellow-300 p-1 sm:p-[3px] shadow-[0_16px_48px_-16px_rgba(15,23,42,0.35)] ring-1 ring-yellow-300/60">
            <form
              onSubmit={form.handleSubmit(searchSubmitHandler)}
              className="flex flex-col overflow-hidden rounded-lg sm:rounded-[13px] bg-background lg:flex-row lg:items-stretch"
            >
              <LocationInput form={form}/>
              <DateSelectInput form={form}/>
              <OccupancyInput form={form}/>
              <Button
                type="submit"
                className="m-2 sm:m-3 h-12 sm:h-14 w-[calc(100%-1rem)] sm:w-[calc(100%-1.5rem)] shrink-0 rounded-xl sm:rounded-2xl border border-blue-600/20 bg-linear-to-r from-blue-700 via-blue-600 to-sky-500 px-4 sm:px-6 py-0 text-sm sm:text-base font-semibold text-white shadow-sm transition-[transform,box-shadow] hover:from-blue-800 hover:via-blue-700 hover:to-sky-600 hover:shadow active:scale-[0.99] lg:w-[152px] lg:flex-[0_0_auto] lg:h-14 lg:my-auto lg:mr-2 lg:rounded-2xl"
              >
                <Icon icon="search" size="18" className="sm:w-5 opacity-95 mr-2" />
                <span>Search</span>
              </Button>
            </form>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default Search;
