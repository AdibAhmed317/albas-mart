import React from 'react';
import dp from '../../assets/b2.jpg';

const CartList = ({ product }) => {
  return (
    <>
      {product &&
        product.products.map((product) => (
          <>
            <hr />
            <div key={product._id} className='flex flex-col md:flex-row m-5'>
              <img
                src={product.img}
                className='h-[150px] w-[150px] object-cover'
              />
              <div className='ml-0 md:ml-5'>
                <h1 className='text-3xl font-serif m-2'>{product.title}</h1>
                <p className='text-lg m-2'>Price: ${product.price}</p>
                <p className='m-2'>Quantity: {product.quantity}</p>
              </div>
            </div>
            <hr />
          </>
        ))}
    </>
  );
};

export default CartList;
