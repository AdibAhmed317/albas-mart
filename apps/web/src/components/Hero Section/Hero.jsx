import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import hero from '../../assets/hero.jpg';

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: 'just',
        duration: 0.3,
      }}
      className='relative overflow-hidden bg-cover bg-no-repeat text-center flex justify-center items-center'
      style={{
        backgroundImage: `url(${hero})`,
        height: '800px',
      }}>
      <div className='h-full w-full flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: 'tween',
            duration: 0.7,
          }}
          className='h-50 w-[40rem] bg-green-200 p-10 border border-green-950/10 rounded-lg shadow-xl'>
          <div className='text-green-900 flex flex-col justify-center items-center m-2'>
            <h2 className='mb-6 font-sans text-4xl md:text-5xl capitalize font-thin'>
              Buy all your daily needs from one place
            </h2>
            <p className='text-2xl font-thin w-auto space-x-10'>
              Al-Raya is a place where you can buy all your daily needs with a
              resonable price. We focus on customer satisfaction and quality of
              our products
            </p>
            <Link
              to='/shop/all'
              className='text-xl mt-5 bg-green-500 inline-flex items-center justify-center w-[60%] h-12 px-6 mb-3 font-thin tracking-wider 
              text-white transition duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-deep-purple-accent-400 
              hover:bg-purple-700 focus:shadow-outline focus:outline-none border border-green-950/10'>
              Shop Now
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
