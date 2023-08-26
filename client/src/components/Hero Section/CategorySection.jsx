import React from 'react';
import CategoryCard from './CategoryCard';

const CategorySection = () => {
  return (
    <div className='mt-10'>
      <h1 className='text-center text-4xl font-thin text-green-900'>
        Popular Categories
      </h1>
      <div>
        <CategoryCard />
      </div>
    </div>
  );
};

export default CategorySection;
