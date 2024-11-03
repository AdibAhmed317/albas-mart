import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/navbar/navbar';
import Dropdown from '../../../components/navbar/DropDown';
import ProfileSidebar from '../../../components/Profile/ProfileSidebar';
import Footer from '../../../components/footer/footer';
import { motion } from 'framer-motion';
import SkeletonProductCard from '../../../components/shop/skeleton-product-card';
import NoProductFound from '../../../components/shop/no-product-found';
import { userRequest } from '../../../network/request-method';
import WishListCard from '../../../components/Profile/WishListCard';

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loggedinId = localStorage.getItem('id');

  useEffect(() => {
    if (loggedinId) {
      fetchWishlistData(loggedinId);
    }
  }, [loggedinId]);

  const fetchWishlistData = async (userId) => {
    setIsLoading(true);
    try {
      const res = await userRequest.get(`wishlist/${userId}`);

      const productsData = res.data;

      setProducts(productsData);
      setIsLoading(false);
      console.log(productsData);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching wishlist data:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Dropdown />
      <ProfileSidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'keyframes',
          delay: 0.175,
        }}
        className='bg-green-50'
      >
        <h1 className='text-3xl text-center text-green-900 p-8'>
          Your Wishlist
        </h1>
        <div className='overflow-x-auto md:min-h-[60vh] p-10'>
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-10'>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={index}>
                  <SkeletonProductCard />
                </div>
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <React.Fragment key={product._id}>
                  {product.productId.map((productInfo) => (
                    <React.Fragment key={productInfo._id}>
                      <WishListCard product={productInfo} />
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <NoProductFound />
            )}
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Wishlist;
