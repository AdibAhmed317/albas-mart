import React from 'react';
import { ShoppingCart } from '../../assets/icons/index';

const PopularItem = ({ product }) => {
  return (
    <div className='md:w-64 w-40 items-center flex flex-col shadow-2xl bg-gray-500 md:m-10 m-2'>
      <img
        className='h-[150px] lg:h-48 w-full'
        src={product.image}
        alt='product image'
      />
      <div className='px-5 pb-5'>
        <div className='mt-1'>
          <h5 className='text-lg font-normal text-white'>{product.name}</h5>
        </div>
        <div className='flex items-center justify-between mt-3 text-white'>
          <span className='text-lg font-medium text-white mr-5'>
            ${product.price}
          </span>
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default PopularItem;

{
  /* <button className='text-sm p- bg-green-500 items-center justify-center mb-3 font-thin tracking-normal text-white duration-200 rounded shadow-md md:w-auto md:mr-4 md:mb-0 bg-deep-purple-accent-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none ml-1'>
Add to cart
</button> */
}
