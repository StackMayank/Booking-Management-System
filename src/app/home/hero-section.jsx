import { Button } from '@/components/ui/button';
import { getHeroHolidayRentalSearchPath } from '@/features/search/build-search-url';
import { useNavigate } from 'react-router';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate(getHeroHolidayRentalSearchPath());
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[430px] sm:min-h-[500px] md:min-h-[560px] bg-black overflow-hidden"
    >
      <img
        className="absolute size-full z-1 max-w-[1440px] mx-auto object-cover inset-0"
        src="./assets/hero-image-luxe-room.png"
        alt="Booking.com Hero Image"
      />
      <div
        className="absolute inset-0 z-2 bg-black/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 z-2 bg-linear-to-r from-black/70 via-black/35 to-transparent"
        aria-hidden="true"
      />

      <div className="z-3 relative container flex min-h-[430px] sm:min-h-[500px] md:min-h-[560px] items-center justify-center md:justify-start px-5 py-16 sm:px-6 sm:py-18 md:py-20">
        <div className="max-w-2xl space-y-5 sm:space-y-6 md:space-y-7 text-center md:text-left">
          <h1 className="text-[2.65rem] sm:text-5xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.08] sm:leading-[1.05] text-white">
            Travel has never{' '}
            <span className="text-yellow-300 drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
              felt
            </span>
            <br />
            <span className="text-yellow-300 drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
              this cosy
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-xl lg:text-1xl font-medium leading-relaxed text-white/90">
            Book an entire place all for yourself
          </p>

          <div className="pt-3 sm:pt-4">
            <Button
              type="button"
              onClick={handleDiscoverClick}
              className="cursor-pointer h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-full bg-yellow-300 text-black hover:bg-yellow-200 shadow-sm hover:shadow transition-all"
            >
              Discover Holiday Rentals
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
