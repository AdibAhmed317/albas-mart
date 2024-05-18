import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './CategoryCard';
import { categories } from '../../assets/data/categories';

const CategorySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
      }}
      className='pt-10 md:pt-24 h-full pb-20 bg-green-200'
    >
      <h1 className='text-center text-5xl font-thin text-green-900 mb-2 md:mb-10'>
        Popular Categories
      </h1>
      <div className='flex flex-col md:flex-row justify-center items-center md:justify-between mx-0 md:mx-40'>
        {categories.map((item) => (
          <CategoryCard item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySection;
