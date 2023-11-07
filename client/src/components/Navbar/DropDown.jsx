import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavbarContext from '../../context/NavbarContext';
import { motion, AnimatePresence } from 'framer-motion';

const Dropdown = () => {
  const { isOpen } = useContext(NavbarContext);

  // Define the animation properties
  const dropdownVariants = {
    hidden: { opacity: 0.2, y: -30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='grid grid-cols-1 text-center items-center bg-green-300 text-green-900 w-full h-full p-10'
          initial='hidden'
          animate='visible'
          exit='hidden'
          variants={dropdownVariants}
          transition={{ duration: 0.3 }}>
          <ul className='flex flex-col justify-center items-center'>
            <li className='justify-center items-center flex'>
              <Link className='small-navlink' to='/'>
                Home
              </Link>
            </li>
            <li className='justify-center items-center flex'>
              <Link className='small-navlink' to='/shop/all'>
                Shop
              </Link>
            </li>
            <li className='justify-center items-center flex'>
              <Link className='small-navlink' to='/contact'>
                Contact
              </Link>
            </li>
            <li className='justify-center items-center flex'>
              <Link className='small-navlink' to='/about'>
                About Us
              </Link>
            </li>
          </ul>
          <ul className='flex justify-center items-center mt-10'>
            <li className='mx-5'>
              <Link
                className='my-1 text-base text-green-50 font-medium m-0 bg-blue-600 hover:bg-blue-900 py-2 px-3 md:mx-2 rounded-md'
                to='/login'>
                Login
              </Link>
            </li>
            <li className='mx-5'>
              <Link
                className='my-1 text-base text-green-50 font-medium m-0 bg-purple-700 hover:bg-purple-500 py-2 px-3 md:mx-2 rounded-md'
                to='/login'>
                Signup
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
