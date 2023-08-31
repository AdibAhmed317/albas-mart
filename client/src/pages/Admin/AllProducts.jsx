import { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import ProductCard from '../../components/Shop/ProductCard';
import NoProductFound from '../../components/Shop/NoProductFound';
import { Search } from '../../assets/icons';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminProductCard from '../../components/Admin/AdminProductCard';

const AllProducts = () => {
  //States for sorting
  const [fetchedProduct, setFetchedProduct] = useState([]);
  // const [inputValue, setInputValue] = useState('');

  //Location from current route
  const location = useLocation();
  const cat = location.pathname.split('/')[3];

  console.log(cat);

  //For Category
  useEffect(() => {
    getProductByCat();
  }, [cat]);

  // For Search
  // useEffect(() => {
  //   searchProduct();
  // }, [inputValue]);

  const getProductByCat = async () => {
    try {
      const catFetch = await axios.get(
        `http://localhost:5000/api/products?category=${cat}`
      );
      const data = catFetch.data;
      setFetchedProduct(data);
      console.log(fetchedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  // const searchProduct = async (event) => {
  //   if (inputValue !== '') {
  //     const fetchSearchProduct = await axios.get(
  //       `http://localhost:5000/api/products/search/${inputValue}`
  //     );
  //     const searchData = fetchSearchProduct.data;
  //     if (searchData) {
  //       setFetchedProduct(searchData);
  //     }
  //   } else {
  //     getProductByCat();
  //   }
  // };

  // const handleSearch = (e) => {
  //   setInputValue(e.target.value);
  // };

  return (
    <div className='bg-green-50 h-full'>
      <Navbar />
      <DropDown />
      <div className='flex md:flex-col lg:flex-row flex-col bg-green-50'>
        <AdminSidebar />
        <div className='h-auto w-screen p-5'>
          <h1 className='text-2xl font-normal text-green-900 mb-4'>
            Search product
          </h1>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Search by ID'
              className='border border-gray-300 rounded px-4 py-2'
            />
            <button className='bg-green-300 text-green-800 font-medium px-4 py-2 rounded ml-2'>
              Search
            </button>
          </div>
          <h1 className='text-2xl font-normal text-green-900 mb-4'>
            All products
          </h1>
          <div className='grid md:grid-cols-4 grid-cols-2 gap-24 justify-center items-center overflow-auto h-[80vh] w-auto md:w-[150vh] ml-5'>
            {fetchedProduct.length > 0 || fetchedProduct.value === null ? (
              fetchedProduct.map((product) => (
                <div className='-mt-0 w-full'>
                  <AdminProductCard product={product} key={product._id} />
                </div>
              ))
            ) : (
              <NoProductFound />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
