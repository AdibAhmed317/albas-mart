import Hero from '@/components/hero-section/temp-hero.jsx';
import Navbar from '@/components/navbar/temp-navbar.jsx';
import Footer from '@/components/footer/temp-footer.jsx';
import CategorySection from '@/components/hero-section/category-section.jsx';
import FeaturedProduct from '@/components/hero-section/featured-product.jsx';
import HomeCarousel from '@/components/hero-section/home-carousel.jsx';

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
