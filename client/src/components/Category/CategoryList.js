import React from 'react';
import { categories } from '../data';
import CategoryItem from './CategoryItem';

const CategoryList = () => {
  return (
    <div className='mb-40'>
      <div className='text-center lg:mt-20 md:mt-40 lg:mb-4 md:mb-4'>
        <h1 className='font-mono text-4xl text-green-900'>
          Featured Categories
        </h1>
      </div>
      <div className='flex flex-col lg:flex-row md:flex-row lg:justify-between md:justify-between px-20 lg:mx-10 w-auto'>
        {categories.map((item) => (
          <CategoryItem item={item} />
        ))}
      </div>
      <div className='flex items-center justify-center mt-5'>
        <button className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-purple-700 bg-green-500 rounded-md font-thin text-xl'>
          View All
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
