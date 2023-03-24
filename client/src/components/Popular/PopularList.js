import React from 'react';
import PopularItem from './PopularItem';
import { popular } from './popular';
import { Link, useLocation } from 'react-router-dom';

const PopularList = () => {
  // const location = useLocation();
  // console.log(location);
  return (
    <div className='h-auto w-auto mt-[750px] lg:mt-0 justify-center items-center flex flex-col'>
      <h1 className='font-mono text-4xl text-green-900 text-center mb-10 lg:-mt-10 -mt-[700px]'>
        Popular Products
      </h1>
      <div className='grid md:grid-cols-5 grid-cols-2'>
        {popular.map((product) => (
          <PopularItem product={product} />
        ))}
      </div>

      <div className='flex items-center justify-center mt-7 mb-16'>
        <Link
          to='/product-list'
          className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-purple-700 bg-green-500 rounded-md font-thin text-xl'
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default PopularList;

// className='mt-4 grid grid-cols-2 md:grid-cols-4 gap-4'
