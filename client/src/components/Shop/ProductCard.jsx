import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from '../../assets/icons/index';
import b3 from '../../assets/hero.jpg';

const ProductCard = ({ product }) => {
  return (
    <div className='md:w-52 w-40 md:h-[45vh] lg:h-[45vh] items-center flex flex-col shadow-2xl bg-white md:m-10 m-2 rounded-b-lg'>
      <div>
        <Link to={`/product/${product._id}`} className='w-full'>
          <img
            className='h-[120px] lg:h-40 w-full object-cover rounded-t-lg'
            src={b3}
            alt='product image'
          />
        </Link>
      </div>
      <div className='w-40 mt-4 lg:pl-1 p-5 md:p-0'>
        <div>
          <h5 className='text-lg font-normal text-green-900'>
            {product.title}
          </h5>
          <h5 className='text-lg font-normal text-green-900 mt-1'>
            {product.size}
          </h5>
          <div className='flex justify-between mt-3'>
            <h5 className='text-lg font-medium text-green-900'>
              ${product.price}
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

// md:h-[45vh] lg:h-[45vh]
{
  /* <hr className='mt-4 bg-green-500 h-[1.5px] w-40'></hr> */
}

{
  /* <div className=' pb-5'>
<div className='mt-1 flex flex-col justify-start w-32'>
  <h5 className='text-lg font-normal text-green-900'>
    {product.title}
  </h5>
  <h5 className='text-lg font-normal text-green-900'>{product.size}</h5>
  <h5 className='text-lg font-medium text-green-900 mr-5 -ml-5'>
    ${product.price}
  </h5>
</div>
<div className='flex items-center justify-between mt-3 text-white w-32'>
  <Link
    className='relative text-green-800 hover:text-green-800 -mr-5'
    to='/cart'>
    <ShoppingCart />
  </Link>
</div>
</div> */
}
