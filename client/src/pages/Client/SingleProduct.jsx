import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import Footer from '../../components/Footer/Footer';

import b2 from '../../assets/b2.jpg';
import { Add, Remove, ShoppingCart } from '../../assets/icons';

const SingleProduct = () => {
  return (
    <div className='bg-green-50' id='container'>
      <Navbar />
      <DropDown />
      <div className='p-[50px] flex flex-col md:flex-row' id='wrapper'>
        <div className='flex-1' id='image-container'>
          <img className='w-full h-96 md:h-[60vh] object-cover' src={b2} />
        </div>
        <div className='flex-1 py-0 px-[50px]' id='info container'>
          <h1 className='font-extralight text-4xl mt-10 md:mt-0' id='title'>
            title
          </h1>
          <p className='my-5 mx-0 text-xl md:text-lg font-thin' id='desc'>
            desc
          </p>
          <span className='font-semibold text-xl' id='price'>
            $10
          </span>
          <div
            className='flex justify-between w-3/6 my-[30px] mx-0'
            id='filterContainer'>
            <div className='flex items-center' id='filter'>
              <span className='font-extralight text-xl m-1' id='filterTitle'>
                Size
              </span>
            </div>
          </div>
          <div
            className='flex justify-between items-center w-3/6'
            id='AddContainer'>
            <div className='flex items-center' id='AmountContainer'>
              <button>
                <Remove />
              </button>
              <span
                className='p-6 w-10 h-10 md:w-[30px] md:h-[30px] text-green-900 rounded-xl border-solid bg-green-200 flex justify-center items-center mx-1'
                id='amount'>
                10
              </span>
              <button>
                <Add />
              </button>
            </div>
            <button className='w-fit h-fit justify-center items-center md:ml-0 ml-10 text-base text-green-900 bg-green-200 rounded-xl px-5 py-1 hover:text-green-600'>
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
    </div>
  );
};

export default SingleProduct;

{
  /* <select
className='bg-green-200 p-2 rounded-full font-thin ml-1'
value={size}
onChange={(event) => setSize(event.target.value)}>
{product.size?.map((option) => (
  <option key={option} value={option}>
    {option}
  </option>
))}
</select> */
}

// onClick={() => hangleQuantity('dec')}
// onClick={handleCart}
// onClick={() => hangleQuantity('inc')}
