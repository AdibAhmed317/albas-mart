import React from 'react';
import SideCategory from '../components/Category/SideCategory';
import Navbar from '../components/Navbar';
import PopularItem from '../components/Popular/PopularItem';
import { popular } from '../components/Popular/popular';
import Footer from '../components/Footer';
import { Search } from '../assets/icons';

const ProductList = () => {
  return (
    <div className='bg-green-100 h-full'>
      <Navbar />
      <div className='flex justify-center items-center mt-10 lg:mt-10 lg:-mb-10'>
        <input
          className='lg:w-[400px] w-60 h-10 rounded-3xl bg-green-200 pl-5 items-center'
          type='search'
          placeholder='Search'
        />
        <a href='#' className='bg-green-200 p-1 mx-2 rounded-full'>
          <Search />
        </a>
      </div>
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start mt-10 lg:mt-20'>
        <SideCategory />
        <div className='grid md:grid-cols-3 grid-cols-2 mt-5 overflow-auto scrollbar-hide h-[80vh] bg-green-50'>
          {popular.map((product) => (
            <PopularItem product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;
