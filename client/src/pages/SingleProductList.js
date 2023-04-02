import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import b2 from '../assets/b2.jpg';
import { Add, Remove, ShoppingCartSingle } from '../assets/icons';
import { publicRequest } from '../api/requestMethods';
import NoProductFound from '../components/Errors/NoProductFound';

const SingleProduct = () => {
  const [product, setProduct] = useState({});

  const location = useLocation();
  const id = location.pathname.split('/')[2];

  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const res = await publicRequest.get('products/find/' + id);
        setProduct(res.data);
      } catch (error) {
        return <NoProductFound />;
      }
    };
    getSingleProduct();
  }, [id]);

  return (
    <div className='bg-green-50' id='container'>
      <Navbar />
      <div className='p-[50px] flex flex-col md:flex-row' id='wrapper'>
        <div className='flex-1' id='image-container'>
          <img className='w-full h-96 md:h-[80vh] object-cover' src={b2} />
        </div>
        <div className='flex-1 py-0 px-[50px]' id='info container'>
          <h1 className='font-extralight text-4xl mt-10 md:mt-0' id='title'>
            {product.title}
          </h1>
          <p className='my-5 mx-0 text-xl md:text-lg font-thin' id='desc'>
            {product.desc}
          </p>
          <span className='font-semibold text-xl' id='price'>
            ${product.price}
          </span>
          <div
            className='flex justify-between w-3/6 my-[30px] mx-0'
            id='filterContainer'
          >
            <div className='flex items-center' id='filter'>
              <span className='font-extralight text-xl m-1' id='filterTitle'>
                Size
              </span>
              {product.size?.map((option) => (
                <select
                  className='bg-green-200 p-2 rounded-full font-thin ml-1'
                  id='filterSize'
                >
                  <option className='font-thin' id='filterSizeOption'>
                    {option}
                  </option>
                </select>
              ))}
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
