import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import b3 from '../../assets/hero.jpg';

const AdminProductCard = ({ product }) => {
  return (
    <div className='flex flex-col shadow-lg bg-green-100 rounded-lg max-w-[16rem]'>
      <div className='h-[90%] md:w-auto'>
        <Link to={`/product/${product._id}`} className='w-full'>
          <img
            className='object-cover rounded-t-lg h-[10rem] md:h-[12rem] w-full justify-center items-center'
            src={product.img}
            alt='product image'
          />
        </Link>
      </div>
      <div className='mt-2 ml-5 md:p-0 justify-start items-start w-full'>
        <div>
          <h5 className='text-lg text-green-900'>
            <b className='text-base'>Title:</b> {product.title}
          </h5>
          <h5 className='text-lg font-normal text-green-900 mt-1'>
            <b className='text-base'>Size:</b> {product.size}
          </h5>
          <div className='flex justify-between mt-2 mb-5 items-center'>
            <h5 className='text-2xl font-thin text-green-900'>
              ৳ {product.price}
            </h5>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 sm:flex-row justify-between items-center p-3 text-sm'>
        <Link
          to={`/admin/edit-product/${product.ProductId}`}
          className='product-link-action bg-blue-500 hover:bg-blue-600'>
          Edit
        </Link>
        <Link
          to={`/admin/product-details/${product.ProductId}`}
          className='product-link-action bg-green-500 hover:bg-green-600'>
          Details
        </Link>
        <button
          onClick={() => deleteProduct(product.ProductId)}
          className='product-link-action bg-red-500 hover:bg-red-600'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
