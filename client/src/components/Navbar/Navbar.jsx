import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from '../../assets/icons/index';
import logo from '../../assets/logoT.png';

const Navbar = ({ Name }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className='bg-green-200 shadow'>
      <div className='container mx-auto px-6 py-3 justify-between md:flex md:items-center'>
        <div className='flex justify-between items-center'>
          <div>
            <Link
              className='text-green-800 text-xl font-bold md:text-2xl hover:text-green-600'
              to='/'>
              <img
                className='h-10 -ml-0 lg:-ml-10 md:-ml-10'
                src={logo}
                alt='Logo'
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className='flex md:hidden'>
            <button
              type='button'
              className='text-green-900 hover:text-green-600 focus:outline-none focus:text-green-600'
              aria-label='toggle menu'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
                <path
                  fill-rule='evenodd'
                  d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`md:flex items-center ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}>
          <div className='flex flex-col md:flex-row md:mx-6 items-center mt-3 mb-2'>
            <Link
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/'>
              Home
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
            <Link
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/shop/'>
              Shop
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
            <Link
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/'>
              Contact
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
            <Link
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/admin-dashboard'>
              Admin
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </div>
          <div className='flex flex-row justify-between text-green-800 hover:text-green-800 md:hidden'>
            <Link
              className='my-1 text-sm text-green-50 font-medium m-5 group bg-purple-700 hover:bg-purple-500 py-1 px-3 rounded-md'
              to='/login'>
              Login
            </Link>
            <Link
              className='flex flex-row relative text-green-800 hover:text-green-800 mt-1'
              to='/'>
              <ShoppingCart />
            </Link>
          </div>
        </div>

        {/* Center Menu for Large Screens */}
        <div className='md:flex justify-center hidden'>
          {Name ? (
            <div className='my-1 text-sm text-green-50 font-medium m-5 group bg-purple-700 hover:bg-purple-500 py-1 px-3 rounded-md'>
              {Name}
            </div>
          ) : (
            <Link
              className='my-1 text-sm text-green-50 font-medium m-5 group bg-purple-700 hover:bg-purple-500 py-1 px-3 rounded-md'
              to='/login'>
              Login
            </Link>
          )}
          <div className='flex justify-center md:block mt-1'>
            <Link
              className='flex flex-row relative text-green-800 hover:text-green-800 mt-1'
              to='/'>
              <ShoppingCart />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
