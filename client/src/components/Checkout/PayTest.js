import React, { useEffect, useState } from 'react';
import StripeChekout from 'react-stripe-checkout';
import axios from 'axios';
import logo from '../../assets/logoT.png';

const PayTest = ({ cartTotal }) => {
  const stripeKey = process.env.REACT_APP_STRIPE_PUBLISH_KEY;
  const [stripeToken, setStripeToken] = useState(null);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeReq = async () => {
      try {
        const res = await axios.post(
          'http://localhost:5000/api/checkout/payment',
          { tokenId: stripeToken.id, amount: cartTotal * 100 }
        );
      } catch (error) {
        console.log(error);
      }
    };
    stripeToken && makeReq();
  }, [stripeToken]);

  return (
    <div className='w-full py-3 bg-black text-white font-semibold text-center'>
      <StripeChekout
        name='Al-Raya'
        image={logo}
        billingAddress
        shippingAddress
        description={`your total is $${cartTotal}`}
        amount={cartTotal * 100} // stripe works in cents
        token={onToken}
        stripeKey={stripeKey}
      >
        <button className='w-full'>Checkout</button>
      </StripeChekout>
    </div>
  );
};

export default PayTest;
