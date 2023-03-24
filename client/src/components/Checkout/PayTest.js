import React, { useEffect, useState, useHistory } from 'react';
import StripeChekout from 'react-stripe-checkout';
import axios from 'axios';
import logo from '../assets/logoT.png';

const PayTest = () => {
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeReq = async () => {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/checkout/payment',
          { tokenId: stripeToken.id, amount: 2000 }
        );
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeReq();
  }, [stripeToken]);

  return (
    <div className='bg-red-500 h-auto w-auto m-20'>
      <StripeChekout
        name='Al-Raya'
        image={logo}
        billingAddress
        shippingAddress
        description='your total is $20'
        amount={2000} // stripe works in cents
        token={onToken}
        stripeKey={`${process.env.REACT_APP_STRIPE_PUBLISH_KEY}`}
      >
        <button>Pay Now</button>
      </StripeChekout>
    </div>
  );
};

export default PayTest;
