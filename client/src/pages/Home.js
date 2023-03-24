import React from 'react';
import CategoryList from '../components/Category/CategoryList';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero Section/Hero';
import Navbar from '../components/Navbar/Navbar';
import PopularList from '../components/Popular/PopularList';

const Home = () => {
  return (
    <div className='bg-green-100'>
      <Navbar />
      <Hero />
      <CategoryList />
      <PopularList />
      <Footer />
    </div>
  );
};

export default Home;
