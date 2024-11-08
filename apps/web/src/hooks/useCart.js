import React, { useState, useEffect } from 'react';
import useAuth from './useAuth';
import { userRequest } from '../network/RequestMethod';

const useCart = () => {
  const { userId } = useAuth();
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await userRequest.get(`cart/${userId}`);
      setCart(res.data);
      console.log(cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return { cart, fetchCart };
};

export default useCart;
