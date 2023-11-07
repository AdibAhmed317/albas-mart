import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useSelector } from 'react-redux';

const Cart = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  const [product, setProduct] = useState();

  const getCartData = () => {
    const cartData = localStorage.getItem('cartData');
    setProduct(JSON.parse(cartData));
    console.log(product);
  };

  useEffect(() => {
    getCartData();
  }, [quantity]);

  const total = product ? product.total : 0;

  return (
    <div className=' bg-green-50'>
      <Navbar />
      <section className='h-40 flex justify-center items-center'>
        <h1 className='text-4xl font-thin'>Your cart ({quantity} items)</h1>
      </section>
      <div className='h-[70vh] flex'>
        <div id='left' className='h-full w-full'>
          {product &&
            product.products.map((product) => (
              <div key={product._id}>
                <h1>{product.title}</h1>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))}
        </div>
        <div
          id='right'
          className='h-full w-[60%] flex justify-center items-center'>
          <div className='h-[90%] w-full mx-10 border-spacing-10 border-[1px] border-black flex justify-start items-center'>
            <div>
              <h1 className='font-thin text-4xl'>
                <b>Subtotal: ${total}</b> <br />
                <b>Total: ${total + 20}</b>
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
