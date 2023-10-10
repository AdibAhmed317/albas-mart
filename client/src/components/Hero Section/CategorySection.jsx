import React from 'react';
import CategoryCard from './CategoryCard';
import { categories } from '../../assets/data/categories';

const CategorySection = () => {
  return (
    <div className='mt-10 h-full mb-20'>
      <h1 className='text-center text-5xl font-thin text-green-900 mb-2'>
        Popular Categories
      </h1>
      <div className='flex flex-col md:flex-row justify-center items-center md:justify-between mx-0 md:mx-40'>
        {categories.map((item) => (
          <CategoryCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
