import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logoT.png';

const demo = () => {
  return (
    <nav className='w-full h-auto bg-green-200 flex justify-between items-center px-10'>
      <div className='flex-1'>
        <Link to='/'>
          <img className='h-10 w-40 m-2' src={logo} alt='Logo' />
        </Link>
      </div>

      <div className='flex-1 text-center'>
        <ul className='flex justify-center items-center'>
          <li className='justify-center items-center flex'>
            <Link
              className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/'>
              Home
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </li>
          <li className='justify-center items-center flex'>
            <Link
              className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/shop/'>
              Shop
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </li>
          <li className='justify-center items-center flex'>
            <Link
              className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/'>
              Contact
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </li>
          <li className='justify-center items-center flex'>
            <Link
              className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/'>
              About Us
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex-1 text-end'>
        <ul className='flex justify-end items-center'>
          <li>
            <Link
              className='my-1 text-base text-green-50 font-medium m-0 bg-blue-600 hover:bg-blue-900 py-2 px-3 md:mx-2 rounded-md'
              to='/login'>
              Login
            </Link>
          </li>
          <li>
            <Link
              className='my-1 text-base text-green-50 font-medium m-0 bg-purple-700 hover:bg-purple-500 py-2 px-3 md:mx-2 rounded-md'
              to='/login'>
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default demo;
