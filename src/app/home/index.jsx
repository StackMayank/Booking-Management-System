import React from 'react';
import HeroSection from './hero-section';
import TrendingDestination from './trending-destination';
import HowItWorks from './guide-booking';
import Search from '@/features/search';
import TestimonialCarousel from './testimonial-carousel';

const Home = () => {
  return (
    <>
      <HeroSection />
      <div id="search-form" className="relative z-[2] mt-6 sm:-mt-8">
        <Search />
      </div>

      <TrendingDestination />
      <HowItWorks />
      <TestimonialCarousel />
    </>
  );
};

export default Home;
