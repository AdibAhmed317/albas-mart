import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Dropdown from '../../components/Navbar/DropDown';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer/Footer';
import ab1 from '../../assets/about/ab1.jpg';
import ab2 from '../../assets/about/ab2.jpg';
import ab3 from '../../assets/about/ab3.jpg';

const About = () => {
  return (
    <>
      <Navbar />
      <Dropdown />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'keyframes',
          delay: 0.175,
        }}
        className='px-20'
      >
        <section className='py-10'>
          <h1 className='text-3xl md:text-4xl font-thin text-center text-green-900 my-5'>
            About AL RAYA
          </h1>
          <p className='text-xl text-justify text-green-900 my-2'>
            Welcome to Al Raya Departmental Store, your one-stop destination for
            quality products and exceptional shopping experience in Chittagong.
            Located in the heart of Chadgao Abashik, we have been serving the
            local community with dedication and commitment.
          </p>
        </section>
        <section className='flex flex-col md:flex-row p-5'>
          <div className='flex-1'>
            <img src={ab3} className='object-cover h-[500px] w-full' />
          </div>
          <div className='flex-1 flex justify-center items-end flex-col'>
            <h1 className='text-xl md:text-2xl font-normal text-end text-green-900 my-2'>
              Our History
            </h1>
            <p className='text-xl text-end text-green-900'>
              Established XXXXX, Al Raya has grown to become a trusted name in
              the retail industry of Chittagong. With years of experience and a
              deep understanding of our customers' needs, we have curated a
              diverse range of products to cater to every shopper's
              requirements.
            </p>
          </div>
        </section>
        <section className='flex flex-col md:flex-row p-5'>
          <div className='flex-1 flex justify-center items-stary flex-col'>
            <h1 className='text-xl md:text-2xl font-normal text-start text-green-900 my-2'>
              Our Mission
            </h1>
            <p className='text-xl text-start text-green-900'>
              Our mission is to provide our customers with a seamless shopping
              experience by offering a wide variety of high-quality products at
              competitive prices. We strive to exceed our customers'
              expectations by delivering exceptional service and creating a
              welcoming environment for all.
            </p>
          </div>
          <div className='flex-1'>
            <img src={ab1} className='object-cover h-[500px] w-full' />
          </div>
        </section>
        <section className='flex flex-col md:flex-row p-5'>
          <div className='flex-1'>
            <img src={ab2} className='object-cover h-[500px] w-full' />
          </div>
          <div className='flex-1 flex justify-center items-end flex-col'>
            <h1 className='text-xl md:text-2xl font-normal text-end text-green-900 my-2'>
              Our Products
            </h1>
            <p className='text-xl text-end text-green-900'>
              At Al Raya, you will find an extensive selection of products
              ranging from groceries, household items, electronics, fashion, and
              much more. We source our products from reputable brands and
              suppliers to ensure that our customers receive only the best.
            </p>
          </div>
        </section>
        <section className='py-12 text-green-900'>
          <h2 className='text-3xl font-semibold mb-8'>Why Choose Al Raya?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='bg-green-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>Quality Products</h3>
              <p>
                We are committed to offering only the highest quality products
                to our customers.
              </p>
            </div>
            <div className='bg-green-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>Affordable Prices</h3>
              <p>
                We strive to provide competitive prices without compromising on
                quality.
              </p>
            </div>
            <div className='bg-green-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-4'>
                Exceptional Service
              </h3>
              <p>
                Our friendly and knowledgeable staff are always ready to assist
                you with your shopping needs.
              </p>
            </div>
          </div>
          <div className='text-center mt-8'>
            <h4 className='text-2xl font-semibold mb-4'>Visit Us Today</h4>
            <p>
              We invite you to visit Al Raya Departmental Store and experience
              the difference of shopping with us. Our team is dedicated to
              making your shopping experience enjoyable and convenient.
            </p>
            <p className='mt-4'>
              Thank you for choosing Al Raya Departmental Store, where quality
              meets affordability.
            </p>
          </div>
        </section>
      </motion.div>
      <Footer />
    </>
  );
};

export default About;

{
  /* <img
src={ab1}
height={500}
width={500}
className='mx-5 object-cover'
/>
<img
src={ab2}
height={500}
width={500}
className='mx-5 object-cover'
/> */
}

{
  /* <img
src={ab1}
height={900}
width={900}
className='object-contain mr-5'
/> */
}

{
  /* <img
src={ab3}
height={900}
width={900}
className='object-contain mr-5'
/> */
}
