import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import b3 from '../../assets/hero.jpg';

const AdminProductCard = ({ product }) => {
  return (
    <div className='w-auto h-[50%] items-center flex flex-col shadow-lg bg-white rounded-b-lg'>
      <div className='h-[90%] md:w-auto'>
        <Link to={`/product/${product._id}`} className='w-full'>
          <img
            className='h-full w-full object-cover rounded-t-xl'
            src={b3}
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
      <div className='flex flex-col md:flex-row justify-between items-center mb-5'>
        <Link
          to={`/admin/edit-product/${product.ProductId}`} // Replace with actual route
          className='mt-2 mx-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>
          Edit
        </Link>
        <Link
          to={`/admin/product-details/${product.ProductId}`} // Replace with actual route
          className='mt-2 mx-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'>
          Details
        </Link>
        <button
          onClick={() => deleteProduct(product.ProductId)}
          className='mt-2 mx-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'>
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminProductCard;
