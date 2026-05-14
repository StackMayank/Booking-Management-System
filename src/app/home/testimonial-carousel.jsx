import React from 'react';
import LogoLoop from '@/components/ui/logo-loop';
import { testimonials } from './testimonials-data';

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5 text-amber-400">
    {Array.from({ length: rating }).map((_, index) => (
      <svg
        key={index}
        className="size-3"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="w-72 flex-shrink-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
    <div className="mb-2 flex items-center gap-2">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="size-9 flex-shrink-0 rounded-full object-cover"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-xs font-semibold text-gray-900">
          {testimonial.name}
        </h3>
        <p className="truncate text-xs text-gray-500">{testimonial.role}</p>
      </div>
    </div>

    <div className="mb-2">
      <StarRating rating={testimonial.rating} />
    </div>

    <p className="line-clamp-3 text-xs leading-relaxed text-gray-700">
      {testimonial.text}
    </p>
  </div>
);

const TestimonialRow = ({ items, direction = 'left', duration = 24 }) => {
  const sequenceWidth = items.length * 288 + Math.max(0, items.length - 1) * 12;
  const speed = Math.round(sequenceWidth / duration);

  return (
    <LogoLoop
      logos={items}
      speed={speed}
      direction={direction}
      width="100%"
      logoHeight={1}
      gap={12}
      hoverSpeed={0}
      className="py-3"
      ariaLabel="Traveler testimonials"
      renderItem={(testimonial) => (
        <TestimonialCard testimonial={testimonial} />
      )}
    />
  );
};

const TestimonialCarousel = () => {
  const row1 = testimonials.slice(0, 7);
  const row2 = testimonials.slice(7, 14);
  const row3 = testimonials.slice(14, 20);

  return (
    <section className="w-full overflow-hidden bg-white mt-[30px] py-0">
      <div className="container px-4 py-0 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-3xl font-medium leading-tight text-slate-900 sm:text-5xl lg:text-5xl">
            Loved by
            <span className="ml-3">
              Travelers
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Trusted by thousands of travelers for comfortable, memorable, and carefully handpicked luxury stays across India.
          </p>
        </div>
      </div>

      <div className="space-y-1.5">
        <TestimonialRow items={row1} direction="left" duration={24} />
        <TestimonialRow items={row2} direction="right" duration={20} />
        <TestimonialRow items={row3} direction="left" duration={20} />
      </div>
    </section>
  );
};

export default TestimonialCarousel;
