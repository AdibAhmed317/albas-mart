import React from 'react';
import { Link } from 'react-router-dom';
import hero from '../../assets/hero.jpg';

const Hero = () => {
  return (
    <div className='relative flex flex-col py-16 lg:pt-0 lg:flex-col lg:pb-0 lg:h-[80vh]'>
      <div className='inset-y-0 right-0 w-full max-w-xl px-4 mx-auto lg:pl-8 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute xl:px-0'>
        <img
          className='object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none sm:h-96 lg:h-full'
          src={hero}
          alt=''
        />
      </div>
      <div className='flex flex-col items-start w-full lg:mr-[400px] max-w-xl px-4 lg:mt-2 lg:px-8 lg:max-w-screen-xl'>
        <div className='mb-16 lg:my-40 lg:max-w-lg lg:pr-5'>
          <div className='max-w-xl mb-6'>
            {/* <div className='mt-3'>
              <p className='inline-block px-3 py-px mb-4 text-xs font-thin tracking-wider text-green-900 uppercase rounded-full bg-teal-accent-400 bg-yellow-500'>
                New Colaboration
              </p>
            </div> */}
            <h2 className='max-w-lg mb-6 font-sans text-5xl capitalize font-thin tracking-tight text-green-900 sm:text-4xl sm:leading-none'>
              Buy all your daily needs from one place
            </h2>
            <p className='text-base text-green-700 md:text-lg'>
              Al-Raya is a place where you can buy all your daily needs with a
              resonable price. We focus on customer satisfaction and quality of
              our products
            </p>
          </div>
          <div className='flex flex-col items-center md:flex-row'>
            <Link
              to='/product-list'
              className='text-xl bg-green-500 inline-flex items-center justify-center w-full h-12 px-6 mb-3 font-thin tracking-wider text-white transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-deep-purple-accent-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none'
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
