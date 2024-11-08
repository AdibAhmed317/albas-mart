import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import StripeCheckout from 'react-stripe-checkout';

import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/footer';
import CartList from '@/components/cart/CartList';
import useAuth from '@/hooks/useAuth';
import { clearCart } from '@/redux/cartRedux';
import { userRequest } from '@/network/RequestMethod';
import { clearCartAsync } from '@/redux/thunks/cartThunk';
import logo from '@/assets/images/basic/logoT.png';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [stripeToken, setStripeToken] = useState(null);
  const items = useSelector((state) => state.cart.items);
  const cartProducts = useSelector((state) => state.cart.products);
  const subtotal = useSelector((state) => state.cart.total);

  const KEY = import.meta.env.VITE_STRIPE;

  useEffect(() => {
    if (stripeToken && subtotal > 0) {
      makeRequest();
    }
  }, [stripeToken, subtotal, navigate, clearCart]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const makeRequest = async () => {
    try {
      const res = await userRequest.post('checkout/payment', {
        tokenId: stripeToken.id,
        amount: (subtotal + 20 - 10) * 100,
      });

      if (res.status === 200) {
        handleOrder(res.data);
        navigate(`/user-details/${loggedId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async (paymentData) => {
    const orderData = {
      userId: userId,
      products: cartProducts,
      amount: subtotal + 20 - 10,
      address: 'asdf',
      status: paymentData.status,
    };

    try {
      const orderRes = await userRequest.post('orders/', orderData);
      console.log(orderRes);
    } catch (error) {
      console.log(error, 'msg');
    }
  };

  const handleClearCart = () => {
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
        dispatch(clearCartAsync(userId));
        Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
      }
    });
  };

  const handleNavigation = () => {
    navigate('/sign-in');
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'keyframes',
          delay: 0.175,
        }}
        className='pt-40'
      >
        <section className='h-40 flex justify-center items-center'>
          <h1 className='text-2xl md:text-4xl font-robotoLight justify-center items-center flex'>
            <span>Your cart ({items} items)</span>
            <button
              className='text-sm md:text-base p-2 px-4 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-5 transition-all'
              onClick={handleClearCart}
            >
              Clear All
            </button>
          </h1>
        </section>
        <div className='h-[100vh] flex flex-col md:flex-row'>
          <div
            id='left'
            className='h-full md:h-[80vh] w-full overflow-auto bg-primaryBlue ml-0 md:ml-10 rounded-lg'
          >
            <CartList />
          </div>
          <div
            id='right'
            className='h-full w-full md:w-[60%] flex justify-center items-center md:items-start'
          >
            <div className='h-[80%] w-full mx-10 border-spacing-10 flex justify-start items-center flex-col'>
              <div class='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'>
                <div class='space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6'>
                  <p class='text-xl font-semibold text-gray-900 dark:text-white'>
                    Order summary
                  </p>

                  <div class='space-y-4'>
                    <div class='space-y-2'>
                      <dl class='flex items-center justify-between gap-4'>
                        <dt class='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Original price
                        </dt>
                        <dd class='text-base font-medium text-gray-900 dark:text-white'>
                          ৳{subtotal}
                        </dd>
                      </dl>

                      <dl class='flex items-center justify-between gap-4'>
                        <dt class='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Discount
                        </dt>
                        <dd class='text-base font-medium text-green-600'>
                          -৳10
                        </dd>
                      </dl>

                      <dl class='flex items-center justify-between gap-4'>
                        <dt class='text-base font-normal text-gray-500 dark:text-gray-400'>
                          Delivery Charge
                        </dt>
                        <dd class='text-base font-medium text-gray-900 dark:text-white'>
                          ৳20
                        </dd>
                      </dl>
                    </div>

                    <dl class='flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700'>
                      <dt class='text-base font-bold text-gray-900 dark:text-white'>
                        Total
                      </dt>
                      <dd class='text-base font-bold text-gray-900 dark:text-white'>
                        ৳{subtotal + 20 - 10}
                      </dd>
                    </dl>
                    <div className='flex justify-center items-center'>
                      {userId === '' || userId === null ? (
                        <button
                          onClick={handleNavigation}
                          className='w-[10rem] h-8 md:h-10 rounded-sm bg-black hover:bg-black/50 hover:text-black text-white'
                        >
                          Login First
                        </button>
                      ) : (
                        <StripeCheckout
                          name='Al-Raya'
                          image={logo}
                          billingAddress
                          shippingAddress
                          description={`Your total is ৳${subtotal + 20 - 10}`}
                          token={onToken}
                          amount={(subtotal + 20 - 10) * 100}
                          stripeKey={KEY}
                        >
                          <button className='w-[10rem] h-8 md:h-10 rounded-sm bg-black hover:bg-black/50 hover:text-black text-white'>
                            Confirm Order
                          </button>
                        </StripeCheckout>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </motion.div>
    </>
  );
};

export default Cart;
