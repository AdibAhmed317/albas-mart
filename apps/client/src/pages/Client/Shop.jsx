import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import Sidebar from '../../components/Shop/Sidebar';
import ProductCard from '../../components/Shop/ProductCard';
import NoProductFound from '../../components/Shop/NoProductFound';
import Footer from '../../components/Footer/Footer';
import SkeletonProductCard from '../../components/Shop/SkeletonProductCard';
import { Search } from '../../assets/icons';
import { publicRequest } from '../../network/RequestMethod';

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
      <DropDown />
      <div className='flex flex-col lg:flex-row items-start justify-center my-10 px-6 gap-4 md:gap-8'>
        <div className='scrollbar-hide shadow-xl rounded-lg p-10 bg-green-100 w-full lg:max-w-[16rem]'>
          <div className='relative flex items-center'>
            <input
              className='h-10 block w-full bg-green-200 pl-3 pr-10 rounded-full'
              type='search'
              placeholder='Search'
              value={inputValue}
              onChange={handleSearch}
            />
            <div className='absolute right-0 top-0 h-full flex items-center pr-3'>
              <Search />
            </div>
          </div>
          <Sidebar />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={index}>
                <SkeletonProductCard />
              </div>
            ))
          ) : fetchedProduct.length > 0 || fetchedProduct.value === null ? (
            fetchedProduct.map((product) => (
              <React.Fragment key={product._id}>
                <ProductCard product={product} />
              </React.Fragment>
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
