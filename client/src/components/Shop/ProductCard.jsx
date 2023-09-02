import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from '../../assets/icons/index';
import b3 from '../../assets/hero.jpg';
import { FaHeart } from 'react-icons/fa6';
import { BsCart3 } from 'react-icons/bs';

const ProductCard = ({ product }) => {
  return (
    <div className='md:w-52 w-[80%] h-[350px] items-center flex flex-col shadow-lg bg-white md:m-10 m-2 rounded-b-lg'>
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
          <h5 className='text-xl font-medium text-green-900'>
            {product.title}
          </h5>
          <h5 className='text-lg font-normal text-green-900 mt-1'>
            <b className='text-base'>Size:</b> {product.size}
          </h5>
          <div className='flex justify-between mt-2 pb-1 md:pb-5 items-center'>
            <div>
              <h5 className='text-2xl font-thin text-green-900'>
                ৳ {product.price}
              </h5>
            </div>
            <div className='mt-1 pl-10'>
              <button className='relative text-red-800 mr-0 md:mr-2'>
                <FaHeart />
              </button>
              <button className='relative text-green-800 hover:text-green-800 mt-1 ml-0 md:ml-2'>
                <BsCart3 />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
