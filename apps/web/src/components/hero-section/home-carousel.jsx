import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import s1 from '@/assets/images/carousel/s1.jpg';
import s2 from '@/assets/images/carousel/s2.jpg';
import s3 from '@/assets/images/carousel/s3.jpg';
import s4 from '@/assets/images/carousel/s4.jpg';

const HomeCarousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  // Array of imported images
  const images = [s1, s2, s3, s4];

  return (
    <>
      <h1 className='text-center text-4xl font-robotoBlack text-primaryRed mt-20 mb-2 md:mb-10'>
        Best Deals
      </h1>
      <div className='flex justify-center items-center min-h-[10vh] bg-white mb-20'>
        <Carousel
          plugins={[plugin.current]}
          className='w-full h-full mx-20 flex justify-center items-center'
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className='p-1'>
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className='object-cover w-full max-h-[70vh]'
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default HomeCarousel;
