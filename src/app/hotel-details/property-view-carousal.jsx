import React from 'react'
import{Carousel, CarouselItem, CarouselPrevious, CarouselNext, CarouselContent} from '@/components/ui/carousel'
const PropertyViewCarousel = (props) => {

  const {images} = props

  return (
    <section>
      <Carousel 
      className='overflow-hidden rounded-lg'
        opts={{
          breakpoints: {
            '(min-width: 1024px)' : { slidesToScroll: 2 },
          },
        }}
      >
        <CarouselContent className='-ml-0.5'>
              {images.map((image, index) => (
                  <CarouselItem key={index} className='basis-1/2 pl-0.5'>
                      <img src={image} alt={`hotel-image-${index}`} className='w-full h-96 object-cover' />
                  </CarouselItem>
              ))}
          </CarouselContent> 
        <CarouselPrevious className=' left-1  text-black '/>
        <CarouselNext className=' right-1 text-black '/>
      </Carousel>
    </section>
  )
}

export default PropertyViewCarousel