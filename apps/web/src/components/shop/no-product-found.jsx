import React from 'react';
import { CiWarning } from 'react-icons/ci';

const NoProductFound = () => {
  return (
    <div className='flex flex-col md:flex-row justify-start items-center bg-yellow-100 p-6 md:p-10 rounded-lg h-auto min-w-full sm:min-w-[20rem] md:min-w-[25rem] lg:min-w-[30rem]'>
      <div className='mb-4 md:mb-0 md:mr-4'>
        <CiWarning className='h-14 w-14 text-black/50' />
      </div>
      <div>
        <h1 className='text-lg sm:text-xl text-black/50'>No Product Found</h1>
        <h1 className='text-sm sm:text-base text-black/50'>
          Try searching with different words.
        </h1>
      </div>
    </div>
  );
};

export default NoProductFound;
