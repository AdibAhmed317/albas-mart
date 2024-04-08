import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo from '../../assets/logoT.png';
import NavbarContext from '../../context/NavbarContext';
import UserContext from '../../context/UserContext';
import { ShoppingCart } from '../../assets/icons';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Notice from './Notice';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const items = useSelector((state) => state.cart.items);

  const { isOpen, setIsOpen } = useContext(NavbarContext);
  const { Name, isAdmin, setName, setIsAdmin } = useContext(UserContext);

  const { userId } = useAuth();

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
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
        Swal.fire(
          'Logged out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  };

  return (
    <>
      <Notice />
      <motion.nav
        className='w-full bg-green-200 flex justify-between items-center'
        initial={{ y: -1, opacity: 0.1 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className='flex-1'>
          <div className='w-auto md:w-[35%]'>
            <Link to='/'>
              <img className='relative h-14 w-auto p-2' src={logo} alt='Logo' />
            </Link>
          </div>
        </div>

        <div className='px-4 cursor-pointer md:hidden' onClick={handleClick}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='#066e06'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </div>

        <div className='flex-1 text-center md:block hidden'>
          <ul className='flex justify-center items-center'>
            <li className='justify-center items-center flex'>
              <Link
                className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
                to='/'
              >
                Home
                <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
              </Link>
            </li>
            <li className='justify-center items-center flex'>
              <Link
                className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
                to='/shop/all'
              >
                Shop
                <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
              </Link>
            </li>
            <li className='justify-center items-center flex'>
              <Link
                className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
                to='/contact'
              >
                Contact
                <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
              </Link>
            </li>

            <li className='justify-center items-center flex'>
              <Link
                className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
                to='/about'
              >
                About Us
                <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
              </Link>
            </li>
          </ul>
        </div>

        <div className='flex-1 text-end md:block hidden'>
          <ul className='flex justify-end items-center'>
            {Name != '' && isAdmin && (
              <>
                <li>
                  <Link
                    className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
                    to={`/cart`}
                  >
                    <div className='flex'>
                      <div className='mt-1'>
                        <ShoppingCart />
                      </div>
                      <div>({items})</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    className='my-1 text-base text-green-800 hover:text-green-600 font-medium m-0 py-2 px-3 md:mx-2 rounded-md'
                    to='/admin/dashboard'
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    className='my-1 text-base text-green-50 font-medium m-0 bg-red-500 hover:bg-red-600 py-2 px-3 md:mx-2 rounded-md'
                    onClick={handleLogout}
                  >
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
                    to={`/cart`}
                  >
                    <div className='flex'>
                      <div className='mt-1'>
                        <ShoppingCart />
                      </div>
                      <div>({items})</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
                    to={`/user-details/${userId}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className='my-1 text-base text-green-50 font-medium m-0 bg-red-500 hover:bg-red-600 py-2 px-3 md:mx-2 rounded-md'
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            {Name === '' && (
              <>
                <li>
                  <Link
                    className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
                    to={`/cart`}
                  >
                    <div className='flex'>
                      <div className='mt-1'>
                        <ShoppingCart />
                      </div>
                      <div>({items})</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link
                    className='my-1 text-base text-green-50 font-medium m-0 bg-blue-600 hover:bg-blue-900 py-2 px-3 md:mx-2 rounded-md'
                    to='/login'
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className='my-1 text-base text-green-50 font-medium m-0 bg-purple-700 hover:bg-purple-500 py-2 px-3 md:mx-2 rounded-md'
                    to='/registration'
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
