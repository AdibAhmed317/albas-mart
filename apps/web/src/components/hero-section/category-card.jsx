import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ item }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, scale: 1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      style={{
        backgroundImage: `url(${item.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className='mt-10 mx-5 shadow-xl bg-no-repeat h-[10rem] w-[15rem] md:h-[20rem] md:w-[20rem] rounded-xl flex items-end'
    >
      <div className='h-[6rem] md:h-[8rem] w-full flex flex-col justify-center items-center rounded-b-2xl bg-black/50'>
        <h1 className='text-base md:text-2xl font-thin text-white'>
          {item.title}
        </h1>
        <Link
          to={`/shop/all`}
          className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-primaryGreen bg-primaryRed rounded-md font-thin text-xl mt-5'
        >
          Shop Now
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
