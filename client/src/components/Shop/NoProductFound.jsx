import React from 'react';

const NoProductFound = () => {
  return (
    <div className='h-[30rem] md:h-screen justify-center items-center flex'>
      <h1 className='text-4xl md:text-6xl text-red-600'>No Product Found :(</h1>
    </div>
  );
};

export default NoProductFound;
