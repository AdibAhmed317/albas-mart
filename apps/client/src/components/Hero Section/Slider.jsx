import React, { useEffect, useState } from 'react';
import s1 from '../../assets/s1.jpg';
import s2 from '../../assets/s2.jpg';
import s3 from '../../assets/s3.jpg';
import s4 from '../../assets/s4.jpg';

import { ArrowRight, ArrowLeft } from '../../assets/icons/index';
import { RxDotFilled } from 'react-icons/rx';

const Slider = () => {
  const slides = [
    {
      url: s1,
    },
    {
      url: s2,
    },
    {
      url: s3,
    },
    {
      url: s4,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalDuration = 3000; // Change slide every 3 seconds
  let intervalId = null;

  const prev = () => {
    clearInterval(intervalId);
    const isFirstSlide = currentIndex === 0;
    const newSlide = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newSlide);
  };

  const next = () => {
    clearInterval(intervalId);
    const isLastSlide = currentIndex === slides.length - 1;
    const newSlide = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newSlide);
  };

  const goToSlide = (slideIndex) => {
    clearInterval(intervalId);
    setCurrentIndex(slideIndex);
  };

  const handleSlideChange = () => {
    intervalId = setInterval(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newSlide = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newSlide);
    }, intervalDuration);
  };

  useEffect(() => {
    handleSlideChange();
    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  return (
    <section className='bg-green-200'>
      <div className='max-w-[90rem] h-full w-full relative py-16 px-4 m-auto group'>
        <h1 className='text-center text-5xl font-thin text-green-900 mb-20'>
          Best Deals
        </h1>
        <div
          style={{
            backgroundImage: `url(${slides[currentIndex].url})`,
            imageRendering: 'optimizeQuality', // Added image rendering property
          }}
          className='w-full h-[400px] rounded-2xl bg-center bg-cover duration-300 flex justify-center items-center'
        ></div>
        {/* Left Arrow */}
        <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full pl-2 pr-1 pt-1  bg-white/20 text-black cursor-pointer'>
          <button onClick={prev}>
            <ArrowLeft />
          </button>
        </div>
        {/* Right Arrow */}
        <div className='hidden group-hover:block absolute top-[55%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full pl-2 pr-1 pt-1 bg-white/20 text-black cursor-pointer'>
          <button onClick={next}>
            <ArrowRight />
          </button>
        </div>
        <div className='flex top-4 justify-center py-2 '>
          {slides.map((slide, slideIndex) => (
            <div
              className='text-4xl cursor-pointer'
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
