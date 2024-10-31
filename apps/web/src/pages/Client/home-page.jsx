import Hero from '@/components/hero-section/hero';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer/footer';
import CategorySection from '@/components/hero-section/category-section';
import FeaturedProduct from '@/components/hero-section/featured-product';
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
