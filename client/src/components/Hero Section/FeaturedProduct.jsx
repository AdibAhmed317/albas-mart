import React, { useEffect, useState } from 'react';
import ProductCard from '../Shop/ProductCard';
import NoProductFound from '../Shop/NoProductFound';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FeaturedProduct = () => {
  const [fetchedProduct, setFetchedProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const catFetch = await axios.get(
        `http://localhost:5000/api/products/eight`
      );
      const data = catFetch.data;
      setFetchedProduct(data);
      console.log(fetchedProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mt-10 h-full mb-20 flex justify-center items-center flex-col'>
      <h1 className='text-center text-5xl font-thin text-green-900 mb-20'>
        Featured Product
      </h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-20'>
        {fetchedProduct.length > 0 || fetchedProduct.value === null ? (
          fetchedProduct.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <NoProductFound />
        )}
      </div>
      <Link
        to={`/shop/all`}
        className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-purple-700 bg-green-500 rounded-md font-thin text-xl mt-10'>
        Shop Now
      </Link>
    </div>
  );
};

export default FeaturedProduct;
