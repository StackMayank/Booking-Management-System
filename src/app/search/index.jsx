import React from 'react';
import Filter from './filter';
import SortFilter from './filter/components/sort-filter';
import Hotels from './hotels';
import PaginationFilter from './filter/components/pagination-filter';
import useQuery from '@/lib/hooks/useQuery';
import API_CONFIG from '@/config/api.config';

const SearchPage = () => {
  const { data, isLoading, error } = useQuery({
    url: API_CONFIG.HOTEL.BROWSE_HOTELS,
    options: {
      params: {
        city: 'Delhi',
        startDate: '2025-03-11',
        endDate: '2025-03-13',
        roomsCount: 2,
        page: 0,
        size: 2,
      },
    },
  });
  const hotels = data?.data.content || []


  return (
    <div className="container flex gap-4 mt-6 mb-12">
      <Filter />
      <section className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Jaipur: 858 properties found</h1>
          <SortFilter />
        </div>
        <Hotels error={error} isLoading={isLoading} data={hotels} />
        {hotels.length > 0 && <PaginationFilter />}
      </section>
    </div>
  );
};

export default SearchPage;
