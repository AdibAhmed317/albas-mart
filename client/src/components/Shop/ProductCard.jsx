import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from '../../assets/icons/index';
import b3 from '../../assets/hero.jpg';

const ProductCard = ({ product }) => {
  return (
    <div className='md:w-52 w-[80%] h-[50%] items-center flex flex-col shadow-lg bg-white md:m-10 m-2 rounded-b-lg'>
      <div className='h-[90%] md:w-auto'>
        <Link to={`/product/${product._id}`} className='w-full'>
          <img
            className='h-full w-full object-cover rounded-t-lg'
            src={b3}
            alt='product image'
          />
        </Link>
      </div>
      <div className='w-40 mt-2 p-5 md:p-0'>
        <div>
          <h5 className='text-lg text-green-900'>
            <b className='text-base'>Title:</b> {product.title}
          </h5>
          <h5 className='text-lg font-normal text-green-900 mt-1'>
            <b className='text-base'>Size:</b> {product.size}
          </h5>
          <div className='flex justify-between mt-2 pb-1 md:pb-5 items-center'>
            <h5 className='text-2xl font-thin text-green-900'>
              ৳ {product.price}
            </h5>
            <Link
              className='relative text-green-800 hover:text-green-800 mt-1'
              to='/cart'>
              <ShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
