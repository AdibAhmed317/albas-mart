import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Navbar from '@/components/navbar/navbar';
import NoProductFound from '@/components/shop/no-product-found';
import AdminSidebar from '@/components/admin/sidebar/admin-sidebar';
import AdminProductCard from '@/components/admin/admin-product-card';
import { publicRequest } from '@/network/request-method';

const AllProducts = () => {
  //States for sorting
  const [fetchedProduct, setFetchedProduct] = useState([]);
  // const [inputValue, setInputValue] = useState('');

  //Location from current route
  const location = useLocation();
  const cat = 'all';

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
      const catFetch = await publicRequest.get(
        `products/all?categories=${cat}`
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
    <>
      <Navbar />
      <AdminSidebar />
      <div className='bg-green-50 p-10'>
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
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
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
    </>
  );
};

export default AllProducts;
