import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logoT.png';
import NavbarContext from '../../context/NavbarContext';
import UserContext from '../../context/UserContext';
import { ShoppingCart } from '../../assets/icons';

const Navbar = () => {
  const { isOpen, setIsOpen } = useContext(NavbarContext);
  const { Name, isAdmin, setName, setIsAdmin } = useContext(UserContext);

  const loggedInId = localStorage.getItem('id');

  const navigate = useNavigate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('id');
    setName('');
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <nav className='w-full h-auto bg-green-200 flex justify-between items-center'>
      <div className='flex-1'>
        <div className='w-auto md:w-[35%]'>
          <Link to='/'>
            <img className='relative h-16 w-auto p-2' src={logo} alt='Logo' />
          </Link>
        </div>
      </div>

      <div className='px-4 cursor-pointer md:hidden' onClick={handleClick}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='#066e06'>
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
              to='/'>
              Home
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </li>
          <li className='justify-center items-center flex'>
            <Link
              className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/shop/all'>
              Shop
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </li>
          <li className='justify-center items-center flex'>
            <Link
              className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/contact'>
              Contact
              <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
            </Link>
          </li>

          <li className='justify-center items-center flex'>
            <Link
              className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
              to='/about'>
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
                  <ShoppingCart />
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
                  className='my-1 text-base text-green-50 font-medium m-0 bg-blue-600 hover:bg-blue-900 py-2 px-3 md:mx-2 rounded-md'
                  to='/login'>
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className='my-1 text-base text-green-50 font-medium m-0 bg-purple-700 hover:bg-purple-500 py-2 px-3 md:mx-2 rounded-md'
                  to='/registration'>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
