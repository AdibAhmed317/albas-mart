import React from 'react';
import { CiWarning } from 'react-icons/ci';

const NoProductFound = () => {
  return (
    <section className='h-40 min-w-[50rem] flex justify-start items-center bg-yellow-100 p-10 rounded-lg'>
      <section className='mx-2'>
        <CiWarning className='h-14 w-14 text-black/50' />
      </section>
      <section className='mx-2'>
        <h1 className='text-xl text-black/50'>No Product Found </h1>
        <h1 className='text-base text-black/50'>
          Try searching with diffrent words.
        </h1>
      </section>
    </section>
  );
};

export default NoProductFound;
