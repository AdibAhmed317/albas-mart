import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';

const Cart = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const cart = useSelector((state) => state.cart);

  return (
    <div className=' bg-green-50'>
      <Navbar />
      <section className='h-40 flex justify-center items-center'>
        <h1 className='text-4xl font-thin'>Your cart ({quantity} items)</h1>
      </section>
      <div className='h-[70vh] flex'>
        <div id='left' className='h-full w-full'>
          {cart.products.map((product) => (
            <>
              <h1>{product.title}</h1>
              <h1>{product.price}</h1>
              <h1>{product.quantity}</h1>
            </>
          ))}
        </div>
        <div
          id='right'
          className='h-full w-[60%] flex justify-center items-center'>
          <div className='h-[90%] w-full mx-10 border-spacing-10 border-[1px] border-black flex justify-start items-center'>
            <div>
              <h1 className='font-thin text-4xl'>
                <b>Subtotal: {cart.total}$</b> <br />
                <b>Total: {cart.total + 20}$</b>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
