import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '../../assets/icons/index';

const ProductCard = ({ product }) => {
  return (
    <div className='md:w-44 w-40 h-[40vh] items-center flex flex-col shadow-2xl bg-white md:m-10 m-2'>
      <Link to='/product' className='w-full'>
        <img
          className='h-[120px] lg:h-40 w-full object-cover'
          src={product.image}
          alt='product image'
        />
      </Link>
      <hr className='mt-4 bg-green-500 h-[1.5px] w-40'></hr>
      <div className='px-5 pb-5'>
        <div className='mt-1'>
          <h5 className='text-lg font-normal text-green-900'>{product.name}</h5>
        </div>
        <div className='flex items-center justify-between mt-3 text-white'>
          <span className='text-lg font-medium text-green-900 mr-5 -ml-5'>
            ${product.price}
          </span>
          <Link
            className='relative text-green-800 hover:text-green-800 -mr-5'
            to='/cart'
          >
            <ShoppingCart />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
