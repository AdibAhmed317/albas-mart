import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import CartList from '../../components/Cart/CartList';
import Dropdown from '../../components/Navbar/DropDown';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/logoT.png';
import { clearCart } from '../../redux/cartRedux';
import { userRequest } from '../../network/RequestMethod';
import { useNavigate } from 'react-router-dom';

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
        dispatch(clearCart());
        Swal.fire('Cleared!', 'Your cart has been cleared.', 'success');
      }
    });
  };

  const handleNavigation = () => {
    navigate('/login');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'keyframes',
        delay: 0.175,
      }}
      className=' bg-green-50'
    >
      <Navbar />
      <Dropdown />
      <section className='h-40 flex justify-center items-center'>
        <h1 className='text-2xl md:text-4xl font-thin'>
          <span>Your cart ({items} items)</span>
          <button
            className='text-sm md:text-lg p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 ml-5 transition-all'
            onClick={handleClearCart}
          >
            Clear All
          </button>
        </h1>
      </section>
      <div className='h-[100vh] flex flex-col md:flex-row'>
        <div
          id='left'
          className='h-full md:h-[80vh] w-full overflow-auto bg-green-100 ml-0 md:ml-10'
        >
          <CartList />
        </div>
        <div
          id='right'
          className='h-full w-full md:w-[60%] flex justify-center items-center md:items-start'
        >
          <div className='h-[80%] w-full mx-10 border-spacing-10 border-[1px] border-black flex justify-center items-center flex-col'>
            <div>
              <span className='font-light text-xl md:text-4xl text-start md:text-justify'>
                <h1 className='m-5'>
                  <b>Subtotal:</b> ৳{subtotal}
                </h1>
                <h1 className='m-5'>
                  <b>Delivery Charge:</b> ৳20
                </h1>
                <h1 className='m-5'>
                  <b>Discount:</b> ৳10
                </h1>
                <h1 className='m-5'>
                  <b>Total:</b> ৳{subtotal + 20 - 10}
                </h1>
              </span>
            </div>
            {userId === '' || userId === null ? (
              <button
                onClick={handleNavigation}
                className='w-[20rem] h-10 md:h-16 rounded-sm bg-black hover:bg-black/50 hover:text-black text-white mt-0 md:mt-10'
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
                <button className='w-[20rem] h-10 md:h-16 rounded-sm bg-black hover:bg-black/50 hover:text-black text-white mt-0 md:mt-10'>
                  Confirm Order
                </button>
              </StripeCheckout>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Cart;
