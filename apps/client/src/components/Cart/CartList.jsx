import React, { useEffect, useState } from 'react';
import { removeProduct, updateProductQuantity } from '../../redux/cartRedux';
import { useDispatch, useSelector } from 'react-redux';
import { publicRequest } from '../../network/RequestMethod';
import useCart from '../../hooks/useCart';

const CartList = () => {
  const products = useSelector((state) => state.cart.products);
  // const { cart } = useCart();
  // console.log(cart);

const CartList = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [products]);

  const fetchProducts = async () => {
    try {
      const productIds = products.map((product) => product._id);
      const promises = productIds.map((id) =>
        publicRequest.get(`/products/find/${id}`)
      );
      const responses = await Promise.all(promises);

      const data = responses.map((res) => res.data);
      setFetchedProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQuantity = (product) => {
    dispatch(
      updateProductQuantity({ ...product, quantity: product.quantity + 1 })
    );
  };

  const decreaseQuantity = (product) => {
    if (product.quantity === 1) {
      dispatch(removeProduct(product._id));
    } else if (product.quantity > 1) {
      dispatch(
        updateProductQuantity({ ...product, quantity: product.quantity - 1 })
      );
    }
  };

  const handleRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  return (
    <>
      {fetchedProducts.map((product, index) => {
        const cartProduct = products.find((p) => p._id === product._id);
        const quantity = cartProduct ? cartProduct.quantity : 0;

        return (
          <div key={index}>
            <hr />
            <div key={product._id} className='flex flex-col md:flex-row m-5'>
              <img
                src={product.img}
                className='h-[150px] w-[150px] object-cover'
              />
              <div className='ml-0 md:ml-5'>
                <h1 className='text-3xl font-serif m-2'>{product.title}</h1>
                <p className='text-lg m-2'>Price: ৳{product.price}</p>
                <div>
                  <button
                    className='h-8 w-8 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all rounded-lg mx-1 text-white'
                    onClick={() => increaseQuantity(cartProduct)}
                  >
                    +
                  </button>
                  <span className='m-2'>{quantity}</span>
                  <button
                    className='h-8 w-8 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all rounded-lg mx-1 text-white'
                    onClick={() => decreaseQuantity(cartProduct)}
                  >
                    -
                  </button>
                  <button
                    className='ml-2 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all p-1 px-2 rounded-lg text-white'
                    onClick={() => handleRemove(product._id)}
                  >
                    Remove
                  </button>
                </div>

      {fetchedProducts.map((product, index) => (
        <div key={index}>
          <hr />
          <div key={product._id} className='flex flex-col md:flex-row m-5'>
            <img
              src={product.img}
              className='h-[150px] w-[150px] object-cover'
            />
            <div className='ml-0 md:ml-5'>
              <h1 className='text-3xl font-serif m-2'>{product.title}</h1>
              <p className='text-lg m-2'>Price: ৳{product.price}</p>
              <div>
                <button
                  className='h-8 w-8 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all rounded-lg mx-1 text-white'
                  onClick={() => increaseQuantity(product)}
                >
                  +
                </button>
                <span className='m-2'>{product.quantity}</span>
                <button
                  className='h-8 w-8 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all rounded-lg mx-1 text-white'
                  onClick={() => decreaseQuantity(product)}
                >
                  -
                </button>
                <button
                  className='ml-2 bg-green-700 hover:bg-green-400 hover:text-green-900 transition-all p-1 px-2 rounded-lg text-white'
                  onClick={() => handleRemove(product._id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <hr />
          </div>
        );
      })}
    </>
  );
};

export default CartList;
