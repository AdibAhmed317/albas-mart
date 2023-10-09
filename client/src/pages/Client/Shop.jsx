import { useState, useEffect } from 'react';

import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import Sidebar from '../../components/Shop/Sidebar';
import ProductCard from '../../components/Shop/ProductCard';
import NoProductFound from '../../components/Shop/NoProductFound';
import { Search } from '../../assets/icons';
import Footer from '../../components/Footer/Footer';

const Shop = () => {
  //States for sorting
  const [fetchedProduct, setFetchedProduct] = useState([]);
  const [inputValue, setInputValue] = useState('');

  //Location from current route
  const location = useLocation();
  const cat = location.pathname.split('/')[2];

  //For Category
  useEffect(() => {
    getProductByCat();
  }, [cat]);

  // For Search
  useEffect(() => {
    searchProduct();
  }, [inputValue]);

  const getProductByCat = async () => {
    try {
      const catFetch = await axios.get(
        `http://localhost:5000/api/products/all?category=${cat}`
      );
      const data = catFetch.data;
      setFetchedProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = async (event) => {
    if (inputValue !== '') {
      const fetchSearchProduct = await axios.get(
        `http://localhost:5000/api/products/search/${inputValue}`
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
    <div className='bg-green-50 h-full'>
      <Navbar />
      <DropDown />
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start mt-10'>
        <div className='md:mr-5 lg:mr-5 mr-0 scrollbar-hide'>
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
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 overflow-auto md:w-[150vh] pb-5 px-1'>
          {fetchedProduct.length > 0 || fetchedProduct.value === null ? (
            fetchedProduct.map((product) => (
              <div className='mt-0 md:mt-10 ml-0 md:ml-2'>
                <ProductCard product={product} key={product._id} />
              </div>
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
