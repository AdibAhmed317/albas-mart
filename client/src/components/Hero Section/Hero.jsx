import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../assets/hero.jpg';

const Hero = () => {
  return (
    <div
      className='relative overflow-hidden bg-cover bg-no-repeat text-center'
      style={{
        backgroundImage: `url(${hero})`,
        height: '700px',
      }}>
      <div
        className='absolute bottom-0 left-0 right-0 top-0 h-full w-full'
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <div className='flex h-full items-center justify-center'>
          <div className='text-white flex flex-col justify-center items-center m-2'>
            <h2 className='mb-6 font-sans text-4xl md:text-5xl capitalize font-thin'>
              Buy all your daily needs from one place
            </h2>
            <p className='text-2xl font-thin w-auto md:w-[60%]'>
              Al-Raya is a place where you can buy all your daily needs with a
              resonable price. We focus on customer satisfaction and quality of
              our products
            </p>
            <Link
              to='/'
              className='text-xl mt-5 bg-green-500 inline-flex items-center justify-center w-[60%] h-12 px-6 mb-3 font-thin tracking-wider text-white transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-deep-purple-accent-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none'>
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
