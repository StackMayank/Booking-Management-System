import React from 'react';
import Filter from './filter';
import SortFilter from './filter/components/sort-filter';
import Hotels from './hotels';
import PaginationFilter from './filter/components/pagination-filter';
import useGetHotels from './hotels/hooks/use-get-hotels';
import { SEARCH_RESULT_PAGE_LIMIT } from '@/config/app.config';

const SearchPage = () => {
  const { data, pending, error, city } = useGetHotels();
  const hotels = data?.content || []
  const totalEntries = data?.totalElements;

  console.log(data);

  return (
    <div className="container flex flex-col lg:flex-row gap-4 md:gap-6 mt-4 md:mt-6 mb-8 md:mb-12">
      <aside className="hidden lg:block lg:w-64 shrink-0">
        <div className="sticky top-[133px]">
          <Filter />
        </div>
      </aside>
      <section className="flex-1 space-y-4 md:space-y-6 w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold break-words">
            {city}: {totalEntries} properties found
          </h1>
          <div className="w-full sm:w-auto">
            <SortFilter />
          </div>
        </div>
        <Hotels error={error} isLoading={pending} data={hotels} />
        {hotels.length > 0 && (
          <PaginationFilter
            totalEntries={totalEntries}
            limit={SEARCH_RESULT_PAGE_LIMIT}
          />
        )}
      </section>
    </div>
  );
};

export default SearchPage;
