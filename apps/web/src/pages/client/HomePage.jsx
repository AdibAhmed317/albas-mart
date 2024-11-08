import Hero from '@/components/hero-section/Hero.jsx';
import Navbar from '@/components/navbar/Navbar.jsx';
import Footer from '@/components/temp-footer/Footer.jsx';
import CategorySection from '@/components/hero-section/CategorySection.jsx';
import FeaturedProduct from '@/components/hero-section/FeaturedProduct.jsx';
import HomeCarousel from '@/components/hero-section/HomeCarousel.jsx';

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
