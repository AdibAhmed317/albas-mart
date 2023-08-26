import React from 'react';
import Hero from '../../components/Hero Section/Hero';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Dropdown from '../../components/Navbar/DropDown';
import CategorySection from '../../components/Hero Section/CategorySection';

const HomePage = ({ Name }) => {
  return (
    <div className='bg-green-50'>
      <Navbar />
      <Dropdown />
      <Hero />
      <CategorySection />
      <Footer />
    </div>
  );
};

export default HomePage;
