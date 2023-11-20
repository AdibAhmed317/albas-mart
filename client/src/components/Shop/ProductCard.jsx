import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import b2 from '../../assets/b2.jpg';
import { FaHeart } from 'react-icons/fa6';
import { BsCart3 } from 'react-icons/bs';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const ProductCard = ({ product }) => {
  const quantity = 1;
  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(addProduct({ ...product, quantity }));

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className='flex flex-col shadow-lg bg-green-100 rounded-lg w-[10rem] md:w-[13rem] my-3 md:my-0'>
      <Link to={`/product/${product._id}`}>
        <img
          className='object-cover rounded-t-lg h-auto md:h-[10rem]'
          src={product.img}
          alt='product image'
        />
      </Link>
      <div className='px-3'>
        <h5 className='text-base md:text-lg font-extralight text-green-900'>
          {product.title}
        </h5>
        <h5 className='text-sm md:text-lg font-medium text-green-900 my-1'>
          {product.size}
        </h5>
        <div className='flex flex-col md:flex-row justify-between md:items-center mb-5'>
          <h5 className='text-base md:text-2xl font-thin text-green-900'>
            ৳ {product.price}
          </h5>
          <div className='mt-1'>
            <button className='relative text-green-400 hover:text-red-700 mr-5'>
              <FaHeart />
            </button>
            <button className='relative text-green-800' onClick={handleCart}>
              <BsCart3 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
