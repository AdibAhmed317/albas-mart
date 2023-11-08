import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import CartList from '../../components/Cart/CartList';
import { addProduct, clearCart } from '../../redux/cartRedux';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';

const Cart = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const total = useSelector((state) => state.cart.total);

  const [product, setProduct] = useState();

  const getCartData = () => {
    const cartData = localStorage.getItem('cartData');
    setProduct(JSON.parse(cartData));
  };

  const dispatch = useDispatch();

  const handleClearCart = () => {
    // SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearCart());
        // Optionally, you can clear the localStorage or perform other state updates here
        Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
      }
    });
  };

  useEffect(() => {
    getCartData();
  }, [quantity]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'keyframes',
        delay: 0.175,
      }}
      className=' bg-green-50'>
      <Navbar />
      <section className='h-40 flex justify-center items-center'>
        <h1 className='text-4xl font-thin'>
          Your cart ({quantity} items){' '}
          <button
            className='text-xl p-2 rounded-lg bg-red-500 text-white hover:bg-red-600'
            onClick={handleClearCart}>
            Clear All
          </button>
        </h1>
      </section>
      <div className='h-[100vh] flex flex-col md:flex-row'>
        <div
          id='left'
          className='h-full w-full overflow-auto bg-green-100 ml-0 md:ml-10'>
          <CartList product={product} />
        </div>
        <div
          id='right'
          className='h-full w-full md:w-[60%] flex justify-center items-center'>
          <div className='h-[90%] w-full mx-10 border-spacing-10 border-[1px] border-black flex justify-start items-center'>
            <div>
              <h1 className='font-light text-3xl text-justify'>
                <h1 className='m-5'>
                  <b>Subtotal:</b> ${total}
                </h1>
                <h1 className='m-5'>
                  <b>Delivery Charge:</b> $20
                </h1>
                <h1 className='m-5'>
                  <b>Discount:</b> $10
                </h1>
                <h1 className='m-5'>
                  <b>Total:</b> ${total + 20 - 10}
                </h1>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Cart;
