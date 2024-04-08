import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { publicRequest } from '../../network/RequestMethod';

import NoProductFound from '../Shop/NoProductFound';
import ProductCard from '../Shop/ProductCard';
import SkeletonProductCard from '../Shop/SkeletonProductCard';

const FeaturedProduct = () => {
  const [fetchedProduct, setFetchedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const catFetch = await publicRequest.get(`products/eight`);
      const data = catFetch.data;
      setFetchedProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-10 h-full mb-20 flex justify-center items-center flex-col px-10'>
      <h1 className='text-center text-5xl font-thin text-green-900 mb-20'>
        Featured Product
      </h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-20'>
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          ))
        ) : fetchedProduct.length > 0 || fetchedProduct.value === null ? (
          fetchedProduct.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))
        ) : (
          <NoProductFound />
        )}
      </div>
      <Link
        to={`/shop/all`}
        className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-purple-700 bg-green-500 rounded-md font-thin text-xl mt-10'
      >
        Shop Now
      </Link>
    </div>
  );
};

export default FeaturedProduct;
