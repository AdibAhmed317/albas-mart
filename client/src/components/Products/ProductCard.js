import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from '../../assets/icons/index';
import b3 from '../../assets/b3.jpg';

const ProductCard = ({ product }) => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];

  return (
    <div className='md:w-44 w-40 md:h-[45vh] lg:h-[45vh] items-center flex flex-col shadow-2xl bg-white md:m-10 m-2'>
      <Link to='/product' className='w-full'>
        <img
          className='h-[120px] lg:h-40 w-full object-cover'
          src={b3}
          alt='product image'
        />
      </Link>
      <hr className='mt-4 bg-green-500 h-[1.5px] w-40'></hr>
      <div className='px-5 pb-5'>
        <div className='mt-1'>
          <h5 className='text-lg font-normal text-green-900'>
            {product.title}
          </h5>
          <h5 className='text-lg font-normal text-green-900'>{product.size}</h5>
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
