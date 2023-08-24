import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavbarContext from '../../context/NavbarContext';

const Dropdown = () => {
  const { isOpen } = useContext(NavbarContext);
  return (
    <div
      className={
        isOpen
          ? 'grid grid-cols-1 text-center items-center bg-green-300 text-green-900 w-full h-full p-10'
          : 'hidden'
      }>
      <ul className='flex flex-col justify-center items-center'>
        <li className='justify-center items-center flex'>
          <Link className='small-navlink' to='/'>
            Home
          </Link>
        </li>
        <li className='justify-center items-center flex'>
          <Link className='small-navlink' to='/'>
            Shop
          </Link>
        </li>
        <li className='justify-center items-center flex'>
          <Link className='small-navlink' to='/'>
            Contact
          </Link>
        </li>
        <li className='justify-center items-center flex'>
          <Link className='small-navlink' to='/'>
            About Us
          </Link>
        </li>
      </ul>
      <ul className='flex justify-between items-center'>
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
      </ul>{' '}
    </div>
  );
};

export default Dropdown;
