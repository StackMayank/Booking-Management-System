import Icon from '@/components/ui/icon';
import React from 'react';
import useHotelNavigation from '../hooks/use-hotel-navigation';
import { Link } from 'react-router';

const hotelInfo = {
  description:
    'A boutique resort with an Indo-Portuguese architecture, the Ronil Goa offers lively holidays filled with recreational activities.',
  details: {
    type: 'Entire Homestay',
    bedrooms: 1,
    guests: 4,
    policies: ['Free Cancellation', 'Book with ₹0 Payment'],
  },
  rating: {
    score: 4.8,
    text: 'Excellent',
    reviews: 8,
  },
};

const HotelImages = ({ photos }) => {
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const imageHoverHandler = (imageIndex) => {
    setActiveImageIndex(imageIndex);
  };
  return (
    <div className="flex flex-col gap-1 shrink-0 w-[108px] sm:w-[132px] md:w-60">
      <div className="w-full md:w-60">
        <img
          height={138}
          width={240}
          className="rounded-sm max-h-[88px] sm:max-h-[110px] md:max-h-[138px] w-full object-cover"
          src={photos[activeImageIndex]}
          alt="Hotel Images"
        />
      </div>
      <div className="grid grid-cols-4 gap-0.5 sm:gap-1 w-full md:w-60">
        {photos.slice(1).map((image, index) => (
          <div className="relative overflow-hidden rounded-sm" key={index}>
            <img
              height={50}
              width={60}
              className="h-8 sm:h-10 md:h-12 w-full object-cover"
              src={image}
              alt="Hotel Images"
              onMouseEnter={() => imageHoverHandler(index + 1)}
            />
            {index === photos.length - 2 && (
              <span className="text-[8px] sm:text-[10px] flex pointer-events-none items-center justify-center font-semibold text-white absolute inset-0 backdrop-blur-sm">
                View All
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const HotelDetailsMeta = () => (
  <>
    <ul className="flex flex-col gap-0.5 text-muted-foreground md:hidden">
      <li className="text-sm font-semibold leading-snug">
        {hotelInfo.details.type}
      </li>
      <li className="text-sm leading-snug">
        {`${hotelInfo.details.bedrooms} Bedroom`}
      </li>
      <li className="text-sm leading-snug">
        {`Sleep ${hotelInfo.details.guests} Guests`}
      </li>
    </ul>
    <div className="hidden md:flex items-center gap-0.5 text-muted-foreground">
      <p className="text-sm font-semibold">{hotelInfo.details.type}</p>|
      <p className="text-sm">{`${hotelInfo.details.bedrooms} Bedroom`}</p>|
      <p className="text-sm">{`Sleep ${hotelInfo.details.guests} Guests`}</p>
    </div>
  </>
);

const HotelCard = ({ name, photos, city, id, amenities, price, taxes }) => {
  const navigationUrl = useHotelNavigation(id);
  const calculatedTaxes = taxes || Math.round(price * 0.18);

  return (
    <Link className="inline-block w-full" to={navigationUrl}>
      <article className="flex flex-col md:flex-row w-full transition-colors border rounded-lg hover:border-primary overflow-hidden">
        <div className="flex flex-1 gap-3 sm:gap-4 p-3 sm:p-4 min-w-0">
          <HotelImages photos={photos} />
          <div className="flex-1 min-w-0 space-y-2 sm:space-y-3">
            <div className="space-y-0.5">
              <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight break-words">
                {name}
              </h2>
              <p className="text-sm font-semibold text-primary leading-snug">
                {city}
              </p>
            </div>
            <HotelDetailsMeta />
            <div>
              <ul className="space-y-1.5 md:space-y-1">
                {amenities.slice(0, 2).map((policy, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-1.5 md:items-center md:gap-1 text-sm text-green-700 leading-snug"
                  >
                    <Icon
                      icon="check"
                      size="16"
                      className="shrink-0 mt-0.5 md:mt-0"
                    />
                    <span className="min-w-0">{policy}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-1 md:flex">
              <p className="text-sm line-clamp-2 sm:line-clamp-1 leading-snug min-w-0">
                {hotelInfo.description}
              </p>
              <span className="text-xs font-medium shrink-0 text-primary sm:flex sm:items-center">
                View More
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-0 border-t border-border/60 md:hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-block px-1.5 py-0.5 text-xs font-bold text-white rounded bg-brand shrink-0">
              {hotelInfo.rating.score}
            </span>
            <p className="text-xs text-muted-foreground truncate">
              {hotelInfo.rating.text} ({hotelInfo.rating.reviews} Ratings)
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-lg font-bold leading-tight">{`₹ ${price.toLocaleString()}`}</p>
            <p className="text-[11px] text-muted-foreground leading-tight">
              {`+ ₹${calculatedTaxes.toLocaleString()} taxes`}
            </p>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end w-48 p-4 border-l shrink-0">
          <div>
            <div className="flex gap-1.5">
              <p className="text-base font-bold text-brand">
                {hotelInfo.rating.text}
              </p>
              <span className="inline-block px-1 py-0.5 text-sm font-bold text-white rounded bg-brand">
                {hotelInfo.rating.score}
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-end">
              &#40;{`${hotelInfo.rating.reviews} Ratings`}&#41;
            </p>
          </div>
          <div className="flex flex-col items-end justify-center flex-1">
            <p className="text-2xl font-bold">{`₹ ${price.toLocaleString()}`}</p>
            <p className="text-sm text-muted-foreground">{`+ ₹${calculatedTaxes.toLocaleString()} taxes & fees`}</p>
            <p className="text-sm text-muted-foreground">Per Night</p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default React.memo(HotelCard);
