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
      }}
      className='mt-10 mx-5 shadow-xl bg-no-repeat h-[20rem] w-[20rem] md:w-[25rem] rounded-2xl flex items-end'
    >
      <div className='h-[8rem] w-full flex flex-col justify-center items-center rounded-b-2xl bg-black/50'>
        <h1 className='text-3xl font-thin text-white'>{item.title}</h1>
        <Link
          to={`/shop/all`}
          className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-purple-700 bg-green-500 rounded-md font-thin text-xl mt-5'
        >
          Shop Now
        </Link>
      </div>
    </motion.div>
  );
};

export default CategoryCard;
