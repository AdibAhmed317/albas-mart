import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoT from '../../assets/logoT.png';

const NavbarNew = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className='bg-blue-200 border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        {/* Logo and Brand Name */}
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img src={logoT} className='h-16' alt='Flowbite Logo' />
        </Link>

        {/* User Menu and Dropdown */}
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative'>
          <button
            type='button'
            className='flex text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
            id='user-menu-button'
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
          >
            <span className='sr-only'>Open user menu</span>
            <img
              className='w-8 h-8 rounded-full'
              src='/docs/images/people/profile-picture-3.jpg'
              alt='user photo'
            />
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div
              className='z-50 absolute top-full mt-2 right-0 w-48 text-base list-none divide-y rounded-lg shadow bg-gray-700 divide-gray-600'
              id='user-dropdown'
            >
              <div className='px-4 py-3'>
                <span className='block text-sm text-gray-900 dark:text-white'>
                  Bonnie Green
                </span>
                <span className='block text-sm text-gray-500 truncate dark:text-gray-400'>
                  name@flowbite.com
                </span>
              </div>
              <ul className='py-2' aria-labelledby='user-menu-button'>
                <li>
                  <Link
                    to='/dashboard'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to='/settings'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to='/earnings'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Earnings
                  </Link>
                </li>
                <li>
                  <Link
                    to='/signout'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile menu toggle button */}
          <button
            data-collapse-toggle='navbar-user'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-user'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links (Home, About, Services, Pricing, Contact) */}
        <div
          className='items-center justify-between hidden w-full md:flex md:w-auto md:order-1'
          id='navbar-user'
        >
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0'>
            <li>
              <Link
                to='/'
                className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-100 md:p-0 md:dark:text-blue-100'
                aria-current='page'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/about'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to='/services'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to='/pricing'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarNew;
