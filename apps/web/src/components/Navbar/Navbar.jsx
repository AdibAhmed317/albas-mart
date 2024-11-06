import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LuShoppingCart } from 'react-icons/lu';

import logoT from '@/assets/images/basic/logoT.png';

import useAuth from '@/hooks/useAuth';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import UserContext from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);
  const items = useSelector((state) => state.cart.items);

  const { userId } = useAuth();
  const navigate = useNavigate();
  const { Name, isAdmin, setName, setIsAdmin } = useContext(UserContext);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownHeight(dropdownRef.current.scrollHeight);
    }
  }, [isDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
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
    <nav className='bg-primaryBlue border-gray-200 fixed z-10 w-screen shadow-xl'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        {/* Logo and Brand Name */}
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img src={logoT} className='h-16' alt='Logo' />
        </Link>

        {/* User Menu and Dropdown / Sign in Button */}
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative'>
          {/* Conditionally render based on userId */}
          {userId ? (
            <>
              {/* Avatar and Dropdown */}
              <button
                type='button'
                className='relative flex items-center justify-center'
                onClick={toggleDropdown}
                aria-expanded={isDropdownOpen}
              >
                <Avatar className='w-10 h-10 md:w-12 md:h-12'>
                  <AvatarImage src='/placeholder-user.jpg' alt='User Avatar' />
                  <AvatarFallback className='bg-cyan-500'>JD</AvatarFallback>
                </Avatar>
                <span className='sr-only'>Open user menu</span>
              </button>

              {/* User Dropdown Menu */}
              <div
                ref={dropdownRef}
                style={{ height: isDropdownOpen ? `${dropdownHeight}px` : '0' }}
                className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out z-50 ${
                  isDropdownOpen ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className='px-4 py-3 border-b border-gray-100'>
                  <span className='block text-sm font-medium'>{Name}</span>
                </div>
                <ul className='py-2'>
                  {/* Loop for Dashboard */}
                  {[
                    {
                      name: 'Dashboard',
                      path: isAdmin
                        ? `/admin-dashboard/${userId}`
                        : `/user-profile/${userId}`,
                    },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  {/* Separate Sign out option */}
                  <li>
                    <button
                      className='block px-4 py-2 text-sm text-primaryRed hover:text-red-900 transition-colors'
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            // Sign In Button
            <Link
              to='/sign-in'
              className='text-sm md:text-base p-2 px-4 rounded-sm bg-red-500 text-white hover:bg-red-600 ml-5 transition-all'
            >
              Sign In
            </Link>
          )}

          {/* Cart Icon */}
          <Link
            className='my-1 text-base text-black/80 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-black/50'
            to={`/cart`}
          >
            <div className='flex'>
              <div className='mt-1'>
                <LuShoppingCart />
              </div>
              <div>({items})</div>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className='md:hidden p-2 rounded-lg transition-colors'
          >
            <span className='sr-only'>Toggle menu</span>
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${
                isMobileMenuOpen ? 'rotate-90' : ''
              }`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </div>

        {/* Desktop Navigation Menu */}
        <div className='hidden md:flex md:w-auto'>
          <ul className='flex space-x-8'>
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop/all' },
              { name: 'Contact', path: '/contact' },
              { name: 'About', path: '/about' },
            ].map((item) => (
              <li key={item.name} className='font-robotoLightItalic'>
                <Link
                  to={item.path}
                  className='block py-2 px-3 text-black/80 hover:text-black transition-colors duration-200 relative group'
                >
                  {item.name}
                  <span className='absolute bottom-0 left-0 w-full h-0.5 bg-black/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200' />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden w-full mt-4 overflow-hidden transition-all duration-300 ease-in-out transform ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
          style={{
            maxHeight: isMobileMenuOpen ? '500px' : '0', // Adjust this as per your content size
          }}
        >
          <ul className='flex flex-col space-y-2'>
            {[
              { name: 'Home', path: '/' },
              { name: 'Shop', path: '/shop/all/' },
              { name: 'Contact', path: '/contact' },
              { name: 'About', path: '/about' },
            ].map((item) => (
              <li key={item.name} className='font-robotoLightItalic'>
                <Link
                  to={item.path}
                  className='block py-2 px-3 text-black/50 hover:text-black transition-colors duration-200'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
