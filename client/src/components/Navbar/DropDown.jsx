import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavbarContext from '../../context/NavbarContext';
import { motion, AnimatePresence } from 'framer-motion';
import UserContext from '../../context/UserContext';
import { ShoppingCart } from '../../assets/icons';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Dropdown = () => {
  const { isOpen } = useContext(NavbarContext);
  const { Name, isAdmin, setName, setIsAdmin } = useContext(UserContext);

  const quantity = useSelector((state) => state.cart.quantity);

  const loggedInId = localStorage.getItem('id');

  const navigate = useNavigate();

  const handleLogout = () => {
    // Use SweetAlert2 for logout confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your session.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('id');
        setName('');
        setIsAdmin(false);
        navigate('/');
        // Optionally, display a success message
        Swal.fire(
          'Logged out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  };

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
            {Name != '' && isAdmin && (
              <>
                <li>
                  <Link
                    className='my-1 text-base text-green-800 hover:text-green-600 font-medium m-0 py-2 px-3 md:mx-2 rounded-md'
                    to='/admin/dashboard'>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className='my-1 text-base text-green-50 font-medium m-0 bg-red-500 hover:bg-red-600 py-2 px-3 md:mx-2 rounded-md'
                    onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {Name != '' && isAdmin == false && (
              <>
                <li>
                  <Link
                    className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
                    to={`/cart`}>
                    <div className='flex'>
                      <div className='mt-1'>
                        <ShoppingCart />
                      </div>
                      <div>({quantity})</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
                    to={`/user-details/${loggedInId}`}>
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className='my-1 text-base text-green-50 font-medium m-0 bg-red-500 hover:bg-red-600 py-2 px-3 md:mx-2 rounded-md'
                    onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
            {Name === '' && (
              <>
                <li>
                  <Link
                    className='my-1 text-base text-green-50 font-medium bg-blue-600 hover:bg-blue-900 py-2 px-3 mx-2 rounded-md'
                    to='/login'>
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className='my-1 text-base text-green-50 font-medium bg-purple-700 hover:bg-purple-500 py-2 px-3 mx-2 rounded-md'
                    to='/registration'>
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dropdown;
