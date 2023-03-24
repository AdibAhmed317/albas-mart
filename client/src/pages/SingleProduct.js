import React from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import b2 from '../assets/b2.jpg';
import { Add, Remove, ShoppingCartSingle } from '../assets/icons';

const SingleProduct = () => {
  return (
    <div className='bg-green-50' id='container'>
      <Navbar />
      <div className='p-[50px] flex flex-col md:flex-row' id='wrapper'>
        <div className='flex-1' id='image-container'>
          <img className='w-full h-96 md:h-[90vh] object-cover' src={b2} />
        </div>
        <div className='flex-1 py-0 px-[50px]' id='info container'>
          <h1 className='font-extralight text-4xl mt-10 md:mt-0' id='title'>
            Cini Gura Chal
          </h1>
          <p className='my-5 mx-0 text-xl md:text-lg font-thin' id='desc'>
            Desc Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum
          </p>
          <span className='font-semibold text-xl' id='price'>
            $999
          </span>
          <div
            className='flex justify-between w-3/6 my-[30px] mx-0'
            id='filterContainer'
          >
            <div className='flex items-center' id='filter'>
              <span className='font-extralight text-xl m-1' id='filterTitle'>
                Size
              </span>
              <select
                className='bg-green-200 p-2 rounded-full font-thin ml-1'
                id='filterSize'
              >
                <option className='font-thin' id='filterSizeOption'>
                  500g
                </option>
                <option className='font-thin' id='filterSizeOption'>
                  1kg
                </option>
                <option className='font-thin' id='filterSizeOption'>
                  1.5kg
                </option>
                <option className='font-thin' id='filterSizeOption'>
                  2kg
                </option>
              </select>
            </div>
          </div>
          <div
            className='flex justify-between items-center w-3/6'
            id='AddContainer'
          >
            <div className='flex items-center' id='AmountContainer'>
              <Remove />
              <span
                className='w-10 h-10 md:w-[30px] md:h-[30px] text-green-900 rounded-xl border-solid bg-green-200 flex justify-center items-center mx-1'
                id='amount'
              >
                1
              </span>
              <Add />
            </div>
            <div className='w-40 h-fit flex justify-center items-center md:ml-0 ml-10 text-base text-green-900 bg-green-200 rounded-xl p-1'>
              <ShoppingCartSingle />
              <p className='justify-center mx-2 md:mx-0 text-green-900'>
                Add to cart
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleProduct;
