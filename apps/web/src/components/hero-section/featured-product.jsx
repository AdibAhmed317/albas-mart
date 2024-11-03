import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Navbar from '@/components/navbar/navbar';
import Sidebar from '@/components/shop/Sidebar';
import ProductCard from '@/components/shop/product-card';
import SkeletonProductCard from '@/components/shop/skeleton-product-card';
import NoProductFound from '@/components/shop/no-product-found';
import Footer from '@/components/footer/footer';
import { publicRequest } from '@/network/request-method';

const FeaturedProduct = () => {
  const [fetchedProduct, setFetchedProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const response = await publicRequest.get('products/eight');
      const data = response.data;
      setFetchedProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define animation variants for the product cards
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2, // delay each item based on its index
        duration: 0.5,
      },
    }),
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
      <h1 className='text-center text-4xl font-robotoBlack text-primaryRed pt-20 mb-2'>
        Featured Products
      </h1>
      <div className='flex flex-col lg:flex-row items-start justify-center mb-10 px-6 gap-4 md:gap-8 min-h-[70vh] pt-40 md:pt-20'>
        {/* Main content for featured products */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={index}>
                <SkeletonProductCard />
              </div>
            ))
          ) : fetchedProduct.length > 0 ? (
            fetchedProduct.map((product, index) => (
              <motion.div
                key={product._id}
                custom={index}
                variants={itemVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.1 }} // Adjust 'amount' as needed
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <NoProductFound />
          )}
        </div>
      </div>

      <div className='flex justify-center mb-20'>
        <Link
          to={`/shop/all`}
          className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-primaryGreen bg-primaryRed rounded-md font-thin text-base md:text-xl mt-10'
        >
          Shop Now
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedProduct;
