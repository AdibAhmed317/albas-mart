import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from '../assets/icons';
import { RxDotFilled } from 'react-icons/rx';
import bb1 from '../assets/bb1.jpg';
import bb2 from '../assets/bb2.jpg';
import bb3 from '../assets/bb3.jpg';
import banner1 from '../assets/banner1.jpg';

const Slider = () => {
  const slides = [
    {
      url: bb1,
    },
    {
      url: bb2,
    },
    {
      url: bb3,
    },
    {
      url: banner1,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(
    Math.floor(Math.random() * slides.length)
  );

  const prev = () => {
    const isFirstSlide = currentIndex === 0;
    const newSlide = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newSlide);
  };

  const next = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newSlide = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newSlide);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className='max-w-[1670px] h-[500px] w-full relative py-16 px-4 m-auto -mt-12 group'>
      <h1 className='font-mono text-4xl text-green-900 text-center mb-10'>
        Best Deals
      </h1>
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className='w-full h-[500px] rounded-2xl bg-center bg-cover duration-300 flex justify-center items-center'
      ></div>
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[70%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full pl-2 pr-1 pt-1  bg-white/20 text-black cursor-pointer'>
        <button onClick={prev}>
          <ArrowLeft />
        </button>
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[70%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full pl-2 pr-1 pt-1 bg-white/20 text-black cursor-pointer'>
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
  );
};

export default Slider;
