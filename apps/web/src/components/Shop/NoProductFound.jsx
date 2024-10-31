import React from 'react';
import { CiWarning } from 'react-icons/ci';

const NoProductFound = () => {
  return (
    <div className='h-40 min-w-full sm:min-w-[20rem] md:min-w-[25rem] lg:min-w-[30rem] flex justify-start items-center bg-yellow-100 p-10 rounded-lg'>
      <div className='mx-2'>
        <CiWarning className='h-14 w-14 text-black/50' />
      </div>
      <div className='mx-2'>
        <h1 className='text-xl text-black/50'>No Product Found</h1>
        <h1 className='text-base text-black/50'>
          Try searching with different words.
        </h1>
      </div>
    </div>
  );
};

export default NoProductFound;
