import React from 'react';

const SkeletonProductCard = () => {
  return (
    <div className='border border-gray-200 rounded-lg p-4 animate-pulse'>
      <div className='w-40 h-40 bg-gray-200 mb-3 rounded-lg'></div>
      <div className='h-4 bg-gray-200 rounded mb-2'></div>
      <div className='h-4 bg-gray-200 rounded mb-2 w-3/4'></div>
      <div className='h-4 bg-gray-200 rounded mb-2 w-1/2'></div>
    </div>
  );
};

export default SkeletonProductCard;
