import React, { lazy, Suspense } from 'react';
import HeroSection from './hero-section';
import TrendingDestination from './trending-destination';
import Search from '@/features/search';
import TestimonialCarousel from './testimonial-carousel';

const HowItWorks = lazy(() => import('./guide-booking'));

const howItWorksFallback = (
  <div
    className="mx-auto max-w-3xl rounded-xl border border-border/60 bg-muted/20 px-4 py-16 sm:px-6"
    aria-hidden
  >
    <div className="mx-auto h-8 w-48 animate-pulse rounded-md bg-muted" />
    <div className="mx-auto mt-8 h-4 max-w-md animate-pulse rounded bg-muted" />
    <div className="mx-auto mt-4 h-4 max-w-sm animate-pulse rounded bg-muted" />
  </div>
);

const Home = () => {
  return (
    <>
      <HeroSection />
      <div id="search-form" className="relative z-[2] mt-6 sm:-mt-8">
        <Search />
      </div>

      <TrendingDestination />
      <Suspense fallback={howItWorksFallback}>
        <HowItWorks />
      </Suspense>
      <TestimonialCarousel />
    </>
  );
};

export default Home;
