import React from 'react';
import logo from '../assets/logoT.png';
import { ShoppingCart } from './icons';

const Navbar = () => {
  return (
    // component
    <nav className='bg-green-300 shadow'>
      <div className='container mx-auto px-6 py-3 justify-between md:flex md:items-center'>
        <div className='flex justify-between items-center'>
          <div>
            <a
              className='text-green-800 text-xl font-bold md:text-2xl hover:text-green-600'
              href='#'
            >
              <img className='h-10' src={logo} />
            </a>
          </div>

          {/*  Mobile menu button  */}
          <div className='flex md:hidden'>
            <button
              type='button'
              className='text-green-900 hover:text-green-600 focus:outline-none focus:text-green-600'
              aria-label='toggle menu'
            >
              <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
                <path
                  fill-rule='evenodd'
                  d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu open: "block", Menu closed: "hidden"  */}
        <div className='md:flex items-center lg:ml-14'>
          <div className='flex flex-col md:flex-row md:mx-6'>
            <a
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0'
              href='#'
            >
              Home
            </a>
            <a
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0'
              href='#'
            >
              Shop
            </a>
            <a
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0'
              href='#'
            >
              Contact
            </a>
            <a
              className='my-1 text-sm text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0'
              href='#'
            >
              About
            </a>
          </div>
        </div>
        <div className='flex'>
          <a
            className='my-1 text-sm text-green-800 font-medium hover:text-green-600 m-5'
            href='#'
          >
            Login
          </a>
          <a
            className='my-1 text-sm text-green-800 font-medium hover:text-green-600 m-5'
            href='#'
          >
            Sign up
          </a>

          <div className='flex justify-center md:block mt-1'>
            <a
              className='relative text-green-800 hover:text-green-800'
              href='#'
            >
              <ShoppingCart />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
