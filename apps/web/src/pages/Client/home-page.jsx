import React from 'react';
import Hero from '../../components/Hero Section/hero';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/Footer/Footer';
import Dropdown from '../../components/navbar/DropDown';
import CategorySection from '../../components/Hero Section/CategorySection';
import FeaturedProduct from '../../components/Hero Section/FeaturedProduct';
import Slider from '../../components/Hero Section/Slider';
import NewNavBar from '../../components/navbar/navbar-new';
import NavbarNew from '../../components/navbar/navbar-new';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Slider />
      <CategorySection />
      <FeaturedProduct />
      <Footer />
    </>
  );
};

export default HomePage;
