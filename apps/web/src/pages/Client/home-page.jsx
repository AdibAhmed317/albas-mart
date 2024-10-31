import React from 'react';
import Hero from '@/components/hero-section/hero';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import CategorySection from '@/components/hero-section/category-section';
import FeaturedProduct from '../../components/hero-section/FeaturedProduct';
import HomeCarousel from '@/components/hero-section/home-carousel';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeCarousel />
      <CategorySection />
      <FeaturedProduct />
      <Footer />
    </>
  );
};

export default HomePage;
