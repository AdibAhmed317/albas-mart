import { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Shop/Sidebar';
import ProductCard from '../../components/Shop/ProductCard';
import NoProductFound from '../../components/Shop/NoProductFound';

const Shop = () => {
  return (
    <div className='bg-green-100 h-full'>
      <Navbar />
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start mt-10'>
        <div className='md:mr-5 lg:mr-5 mr-0 scrollbar-hide'>
          <div className='flex justify-start items-center mt-0 lg:mt-5 ml-10'>
            <input
              className='lg:w-[200px] w-60 h-10 bg-green-200 pl-5 items-center'
              type='search'
              placeholder='Search'
              value={inputValue}
              onChange={handleSearch}
            />
          </div>
          <Sidebar />
        </div>
        <div className='grid md:grid-cols-4 grid-cols-2 overflow-auto scrollbar-hide h-[80vh] w-auto md:w-[150vh] bg-green-50'>
          {fetchedProduct.length > 0 || fetchedProduct.value === null ? (
            fetchedProduct.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
          ) : (
            <NoProductFound />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
