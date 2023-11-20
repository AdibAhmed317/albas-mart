import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import Sidebar from '../../components/Shop/Sidebar';
import ProductCard from '../../components/Shop/ProductCard';
import NoProductFound from '../../components/Shop/NoProductFound';
import { Search } from '../../assets/icons';
import Footer from '../../components/Footer/Footer';
import { publicRequest } from '../../network/RequestMethod';
import SkeletonProductCard from '../../components/Shop/SkeletonProductCard';

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
      className='bg-green-50 h-full'>
      <Navbar />
      <DropDown />
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start mt-10'>
        <div className='md:mr-5 mr-0 scrollbar-hide w-auto md:w-[15rem]'>
          <div className='flex justify-start items-center mt-0 lg:mt-5'>
            <input
              className='lg:w-[200px] w-60 h-10 bg-green-200 pl-3 items-center'
              type='search'
              placeholder='Search'
              value={inputValue}
              onChange={handleSearch}
            />
            <Search />
          </div>
          <Sidebar />
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 overflow-auto md:w-[150vh] pb-5 px-1'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={index}>
                <SkeletonProductCard />{' '}
              </div>
            ))
          ) : fetchedProduct.length > 0 || fetchedProduct.value === null ? (
            fetchedProduct.map((product) => (
              <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={product._id}>
                <ProductCard product={product} />
              </div>
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

//<h1>Loading... Please Wait.</h1>
