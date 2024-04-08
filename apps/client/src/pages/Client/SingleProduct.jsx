import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import Footer from '../../components/Footer/Footer';

import { Add, Remove, ShoppingCart } from '../../assets/icons';
import { publicRequest } from '../../network/RequestMethod';
import Swal from 'sweetalert2';
import { addProductAsync } from '../../redux/thunks/cartThunk';

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [fetchedProduct, setFetchedProduct] = useState([]);

  const dispatch = useDispatch();

  const location = useLocation();
  const paramId = location.pathname.split('/')[2];

  const handleOnClick = (param) => {
    if (param === 'Add') {
      setQuantity(quantity + 1);
    } else if (param === 'Remove' && quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    getProductById();
  }, [paramId]);

  const getProductById = async () => {
    try {
      const productFetch = await publicRequest.get(`products/find/${paramId}`);
      const data = productFetch.data;
      setFetchedProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCart = () => {
    const cartData = {
      products: [
        {
          _id: fetchedProduct._id,
          quantity: quantity,
          price: fetchedProduct.price,
        },
      ],
      userId: null,
    };
    console.log(cartData);

    // dispatch(addOrUpdateProduct({ products: cartData.products }));
    dispatch(addProductAsync({ products: cartData.products }));

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
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
      className='bg-green-50'
      id='container'
    >
      <Navbar />
      <DropDown />
      <div className='p-[50px] flex flex-col md:flex-row' id='wrapper'>
        <div className='flex-1' id='image-container'>
          <img
            className='w-full h-96 md:h-[60vh] object-cover'
            src={fetchedProduct.img}
          />
        </div>
        <div className='flex-1 py-0 px-[50px]' id='info container'>
          <h1 className='font-extralight text-4xl mt-10 md:mt-0' id='title'>
            {fetchedProduct.title}
          </h1>
          <p className='my-5 mx-0 text-xl md:text-lg font-thin' id='desc'>
            {fetchedProduct.desc}
          </p>
          <span className='font-medium text-xl' id='price'>
            ৳ {fetchedProduct.price}
          </span>
          <div
            className='flex justify-between w-3/6 my-[30px] mx-0'
            id='filterContainer'
          >
            <div className='flex items-center' id='filter'>
              <span className='font-extralight text-xl m-1' id='filterTitle'>
                Size: {fetchedProduct.size}
              </span>
            </div>
          </div>
          <div
            className='flex justify-between items-center w-3/6'
            id='AddContainer'
          >
            <div className='flex items-center' id='AmountContainer'>
              <button onClick={() => handleOnClick('Remove')}>
                <Remove />
              </button>
              <span
                className='p-6 w-10 h-10 md:w-[30px] md:h-[30px] text-green-900 rounded-xl border-solid bg-green-200 flex justify-center items-center mx-1'
                id='amount'
              >
                {quantity}
              </span>
              <button onClick={() => handleOnClick('Add')}>
                <Add />
              </button>
            </div>
            <button
              onClick={handleCart}
              className='w-fit h-fit justify-center items-center md:ml-0 ml-10 text-base text-green-900 bg-green-200 rounded-xl px-5 py-1 hover:text-green-600'
            >
              <div className='flex justify-center items-center'>
                <p className='mr-2'>
                  <ShoppingCart />
                </p>
                <p className='justify-center mx-2 md:mx-0'>Add to cart</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default SingleProduct;
