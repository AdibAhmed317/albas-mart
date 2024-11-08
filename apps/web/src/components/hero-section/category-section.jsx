import React from 'react';
import { motion } from 'framer-motion';
import CategoryCard from './category-card.jsx';
import { categories } from '../../assets/data/categories.js';

const CategorySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.5,
      }}
      className='min-h-20 pb-20 bg-primaryBlue'
    >
      <h1 className='text-center text-3xl sm:text-4xl font-robotoBlack text-primaryGreen pt-10 sm:pt-20 mb-4 sm:mb-10'>
        Popular Categories
      </h1>
      <div className='flex flex-wrap justify-center items-center gap-5 md:gap-10 mx-0 md:mx-10'>
        {categories.map((item) => (
          <CategoryCard key={item.id} item={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySection;
