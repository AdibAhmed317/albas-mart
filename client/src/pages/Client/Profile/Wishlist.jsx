import React, { useState, useEffect } from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Dropdown from '../../../components/Navbar/DropDown';
import ProfileSidebar from '../../../components/Profile/ProfileSidebar';
import Footer from '../../../components/Footer/Footer';
import { motion } from 'framer-motion';
import SkeletonProductCard from '../../../components/Shop/SkeletonProductCard';
import ProductCard from '../../../components/Shop/ProductCard';
import NoProductFound from '../../../components/Shop/NoProductFound';
import { userRequest, publicRequest } from '../../../network/RequestMethod';

const Wishlist = () => {
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const loggedinId = localStorage.getItem('id');

  useEffect(() => {
    if (loggedinId) {
      fetchWishlist(loggedinId);
    }
  }, [loggedinId]);

  async function fetchWishlist(userId) {
    setIsLoading(true);
    try {
      const res = await userRequest.get(`wishlist?userId=${userId}`);
      const wishlistData = res.data;

      if (wishlistData && wishlistData.length > 0) {
        const productIds = wishlistData.map((item) => item.productId);

        const productsResponse = await publicRequest.get('products', {
          params: { productIds: productIds.join(',') },
        });

        const products = productsResponse.data;
        setFetchedProducts(products);
      } else {
        setFetchedProducts([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const mapProductsForCard = fetchedProducts.map((product) => ({
    id: product._id,
    title: product.title,
    description: product.desc,
    image: product.img,
    // Add other necessary fields as required by ProductCard
  }));

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
        className='bg-green-50'>
        <h1 className='text-3xl text-center text-green-900 p-8'>
          Your Wishlist
        </h1>
        <div className='overflow-x-auto md:min-h-[60vh] p-10'>
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'>
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div className='mt-0 md:mt-10 ml-0 md:ml-2' key={index}>
                  <SkeletonProductCard />
                </div>
              ))
            ) : mapProductsForCard.length > 0 ? (
              mapProductsForCard.map((product) => (
                <React.Fragment key={product.id}>
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    image={product.image}
                  />
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
