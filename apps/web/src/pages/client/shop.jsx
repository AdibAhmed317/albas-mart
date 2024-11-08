import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '@/components/navbar/navbar';
import Sidebar from '@/components/shop/sidebar';
import ProductCard from '@/components/shop/product-card';
import NoProductFound from '@/components/shop/no-product-found';
import Footer from '@/components/footer/footer';
import SkeletonProductCard from '@/components/shop/skeleton-product-card';
import { publicRequest } from '@/network/request-method';
import { FiSearch } from 'react-icons/fi';

const Shop = () => {
  const [fetchedProduct, setFetchedProduct] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const cat = location.pathname.split('/')[2];

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const catFetch = await publicRequest.get(
          `products/all?categories=${cat}`
        );
        const data = catFetch.data;
        setFetchedProduct(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [cat]);

  useEffect(() => {
    searchProduct();
  }, [inputValue]);

  const getProductByCat = async () => {
    try {
      const catFetch = await publicRequest.get(
        `products/all?categories=${cat}`
      );
      const data = catFetch.data;
      setFetchedProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = async () => {
    if (inputValue !== '') {
      const fetchSearchProduct = await publicRequest.get(
        `products/search/${inputValue}`
      );
      const searchData = fetchSearchProduct.data;
      if (searchData) {
        setFetchedProduct(searchData);
      }
    } else {
      getProductByCat();
    }
  };

  const handleSearch = (e) => {
    setInputValue(e.target.value);
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
    >
      <Navbar />
      <div className='flex flex-col lg:flex-row items-start justify-center mb-10 px-6 gap-4 md:gap-8 min-h-[70vh] pt-40'>
        <div className='scrollbar-hide shadow-xl rounded-lg p-10 bg-primaryBlue w-full lg:max-w-[16rem]'>
          <div className='relative flex items-center'>
            <input
              className='h-10 block w-full bg-blue-100 pl-3 pr-10 rounded-full'
              type='search'
              placeholder='Search'
              value={inputValue}
              onChange={handleSearch}
            />
            <div className='absolute right-0 top-0 h-full flex items-center pr-3'>
              <FiSearch />
            </div>
          </div>
          <Sidebar />
        </div>

        {/* Responsive grid layout */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={index}>
                <SkeletonProductCard />
              </div>
            ))
          ) : fetchedProduct.length > 0 ? (
            fetchedProduct.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
          ) : (
            <NoProductFound />
          )}
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Shop;
