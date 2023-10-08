import React from 'react';
import { Link } from 'react-router-dom';
import b2 from '../../assets/b2.jpg';
import { FaHeart } from 'react-icons/fa6';
import { BsCart3 } from 'react-icons/bs';

const ProductCard = ({ product }) => {
  return (
    <div className='flex flex-col shadow-lg bg-white rounded-b-lg'>
      <div className=''>
        <img
          className='object-cover rounded-t-lg'
          src={b2}
          alt='product image'
        />
      </div>
      <div className='px-3'>
        <h5 className='text-base md:text-xl font-medium text-green-900'>
          {product.title}
        </h5>
        <h5 className='text-sm md:text-lg font-medium text-green-900 mt-1'>
          <b>Size:</b> {product.size}
        </h5>
        <div className='flex flex-col md:flex-row justify-between md:items-center'>
          <h5 className='text-base md:text-2xl font-thin text-green-900'>
            ৳ {product.price}
          </h5>
          <div>
            <button className='relative text-green-800 hover:text-green-800 mt-1'>
              <BsCart3 />
            </button>
            <button className='relative text-red-800'>
              <FaHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

{
  /* <div className='w-40 mt-2'>
<div className=''>


  <div className='flex flex-col justify-center md:justify-between mt-2 pb-1 md:pb-5 items-center md:flex-row'>
    <div>

    </div>
    <div className='mt-1 pl-10'>

    </div>
  </div>
</div>
</div> */
}
