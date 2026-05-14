import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, MapPin } from 'lucide-react';

const destinations = [
  {
    id: 1,
    title: 'Royal Jaipur',
    location: 'Jaipur',
    image:
      'https://i.pinimg.com/736x/d4/1a/a9/d41aa9a1ffe00510af72ece3f9a8e930.jpg',
    rating: 4.8,
    reviews: 343,
    featured: false,
  },
  {
    id: 2,
    title: 'Capital Vibes',
    location: 'Delhi',
    image:
      'https://i.pinimg.com/736x/52/c3/ee/52c3ee3527614464af94212c318de0c3.jpg',
    rating: 4.6,
    reviews: 218,
    featured: false,
  },
  {
    id: 3,
    title: 'Goa Escape',
    location: 'Goa',
    image:
      'https://i.pinimg.com/736x/d5/9b/f1/d59bf1fe70888bbd360a2c3d56f5bf8c.jpg',
    rating: 4.9,
    reviews: 521,
    featured: true,
  },
  {
    id: 4,
    title: 'Modern Gurgaon',
    location: 'Gurgaon',
    image:
      'https://i.pinimg.com/736x/8f/12/94/8f1294f9fba7bc01ba1a49dcfd32045e.jpg',
    rating: 4.5,
    reviews: 156,
    featured: false,
  },
  {
    id: 5,
    title: 'North Goa Retreat',
    location: 'North Goa',
    image:
      'https://i.pinimg.com/736x/d7/1f/6a/d71f6a8f2aae5b0f5f582daefa6519c4.jpg',
    rating: 4.7,
    reviews: 403,
    featured: false,
  },
  {
    id: 6,
    title: 'Mumbai Nights',
    location: 'Mumbai',
    image:
      'https://i.pinimg.com/736x/be/55/31/be5531a2ca52ecacf16abb82f5f8c45d.jpg',
    rating: 4.8,
    reviews: 445,
    featured: false,
  },
  {
    id: 7,
    title: 'Tech Bangalore',
    location: 'Bangalore',
    image:
      'https://i.pinimg.com/1200x/5e/88/cb/5e88cbe2f957bdbf2e00e3e2f4fee57d.jpg',
    rating: 4.4,
    reviews: 192,
    featured: false,
  },
  {
    id: 8,
    title: 'Hyderabad Charm',
    location: 'Hyderabad',
    image:
      'https://i.pinimg.com/736x/41/0b/26/410b2637ca6e0fc3ba4119c96ba4bcc3.jpg',
    rating: 4.6,
    reviews: 257,
    featured: false,
  },
  {
    id: 9,
    title: 'Chennai Coast',
    location: 'Chennai',
    image:
      'https://i.pinimg.com/736x/cb/88/de/cb88dea08ad6949f9867c831d0358dc3.jpg',
    rating: 4.3,
    reviews: 178,
    featured: false,
  },
  {
    id: 10,
    title: 'Pune Explorer',
    location: 'Pune',
    image:
      'https://i.pinimg.com/736x/ea/e3/90/eae3909b655ae7d4567206efc4e8ed14.jpg',
    rating: 4.7,
    reviews: 311,
    featured: false,
  },
];

const TopTrendingDestinations = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [liked, setLiked] = useState(new Set());
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const cardWidth = clientWidth < 640 ? clientWidth * 0.82 + 24 : 344;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.max(0, Math.min(4, index)));
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;

    const scrollAmount = window.innerWidth < 640 ? window.innerWidth * 0.88 : 400;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);

    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });

    window.setTimeout(checkScroll, 320);
  };

  const toggleLike = (id) => {
    setLiked((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="mt-[45px]">
      <div className="px-4 py-0 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-8 sm:mb-14 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-medium leading-tight text-slate-900 sm:text-5xl lg:text-5xl">
              Top
              <span className="ml-3 ">
                Destinations
              </span>
            </h2>
          </div>

          <div className="hidden sm:flex gap-3 self-start sm:self-auto">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="rounded-full border-2 border-blue-600 bg-white p-3 text-blue-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 disabled:opacity-40"
              aria-label="Scroll left"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="rounded-full border-2 border-blue-600 bg-white p-3 text-blue-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-blue-600 hover:text-white hover:shadow-xl active:scale-95 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 disabled:opacity-40"
              aria-label="Scroll right"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="grid grid-cols-2 sm:flex gap-3 sm:gap-6 overflow-x-visible sm:overflow-x-auto pb-2 scroll-smooth sm:[scrollbar-width:none] sm:[&::-webkit-scrollbar]:hidden"
          >
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="group w-full sm:w-80 flex-shrink-0"
              >
                <div className="relative h-48 sm:h-96 overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl transition-all duration-500 hover:shadow-2xl">
                  <img
                    src={destination.image}
                    alt={destination.title}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/40 to-transparent transition-opacity duration-300" />

                  <button
                    onClick={() => toggleLike(destination.id)}
                    className="absolute right-4 top-4 z-20 rounded-full border-2 border-white/40 bg-white/20 p-3 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white/40 active:scale-95"
                    aria-label="Like destination"
                  >
                    <Heart
                      className={`size-5 transition-all ${
                        liked.has(destination.id)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-white'
                      }`}
                    />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-3 sm:p-6">
                    <h3 className="mb-1 text-base sm:text-xl font-light leading-tight text-white drop-shadow-lg line-clamp-1">
                      {destination.title}
                    </h3>

                    <div className="mb-4 flex items-center gap-2">
                      <MapPin className="size-4 flex-shrink-0 text-yellow-400" />
                      <p className="text-sm font-semibold text-white/90">
                        {destination.location.split(',')[0]}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex items-center gap-1 sm:gap-2 rounded-full border border-white/30 bg-white/20 px-2 sm:px-4 py-1 sm:py-2 backdrop-blur-md">
                        <div className="flex items-center gap-1">
                          <span className="text-sm sm:text-lg text-yellow-400">★</span>
                        </div>
                        <span className="text-xs sm:text-sm font-bold text-white">
                          {destination.rating}
                        </span>
                        <span className="text-[10px] sm:text-xs text-white/70">
                          ({destination.reviews})
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-yellow-400/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopTrendingDestinations;
