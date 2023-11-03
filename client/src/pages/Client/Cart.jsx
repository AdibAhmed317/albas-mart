import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const Cart = () => {
  const [itemCount, setItemCount] = useState(10);
  return (
    <div className=' bg-green-50'>
      <Navbar />
      <section className='h-40 flex justify-center items-center'>
        <h1 className='text-4xl font-thin'>Your cart ({itemCount} items)</h1>
      </section>
      <div className='h-[70vh] flex'>
        <div id='left' className='bg-blue-500 h-full w-full'></div>
        <div
          id='right'
          className='h-full w-[60%] flex justify-center items-center'>
          <div className='h-[90%] w-full mx-10 border-spacing-10 border-[1px] border-black flex justify-start items-center'>
            <div>
              <h1 className='font-thin text-4xl'>
                <b>Subtotal: 10$</b>
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
