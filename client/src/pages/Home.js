import React from 'react';
import CategoryList from '../components/Category/CategoryList';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import PopularList from '../components/Popular/PopularList';

const Home = () => {
  return (
    <div className='bg-green-50'>
      <Navbar />
      <Hero />
      <CategoryList />
      <PopularList />
      <Footer />
    </div>
  );
};

export default Home;
