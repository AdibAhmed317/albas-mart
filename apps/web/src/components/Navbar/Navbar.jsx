// import React, { useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import logo from '../../assets/logoT.png';
// import NavbarContext from '../../context/NavbarContext';
// import UserContext from '../../context/UserContext';
// import { ShoppingCart } from '../../assets/icons';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import Notice from './Notice';
// import useAuth from '../../hooks/useAuth';

// const Navbar = () => {
//   const items = useSelector((state) => state.cart.items);

//   const { isOpen, setIsOpen } = useContext(NavbarContext);
//   const { Name, isAdmin, setName, setIsAdmin } = useContext(UserContext);

//   const { userId } = useAuth();

//   const navigate = useNavigate();

//   const handleClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleLogout = () => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You will be logged out of your session.',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, logout!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('id');
//         setName('');
//         setIsAdmin(false);
//         navigate('/');
//         Swal.fire(
//           'Logged out!',
//           'You have been successfully logged out.',
//           'success'
//         );
//       }
//     });
//   };

//   return (
//     <>
//       {/* <Notice /> */}
//       <motion.nav
//         className='w-full bg-green-200 flex justify-between items-center'
//         initial={{ y: -1, opacity: 0.1 }}
//         animate={{ y: 0, opacity: 1 }}
//       >
//         <div className='flex-1'>
//           <div className='w-auto md:w-[35%]'>
//             <Link to='/'>
//               <img className='relative h-14 w-auto p-2' src={logo} alt='Logo' />
//             </Link>
//           </div>
//         </div>

//         <div className='px-4 cursor-pointer md:hidden' onClick={handleClick}>
//           <svg
//             xmlns='http://www.w3.org/2000/svg'
//             className='h-6 w-6'
//             fill='none'
//             viewBox='0 0 24 24'
//             stroke='#066e06'
//           >
//             <path
//               strokeLinecap='round'
//               strokeLinejoin='round'
//               strokeWidth={2}
//               d='M4 6h16M4 12h16m-7 6h7'
//             />
//           </svg>
//         </div>

//         <div className='flex-1 text-center md:block hidden'>
//           <ul className='flex justify-center items-center'>
//             <li className='justify-center items-center flex'>
//               <Link
//                 className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
//                 to='/'
//               >
//                 Home
//                 <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
//               </Link>
//             </li>
//             <li className='justify-center items-center flex'>
//               <Link
//                 className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
//                 to='/shop/all'
//               >
//                 Shop
//                 <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
//               </Link>
//             </li>
//             <li className='justify-center items-center flex'>
//               <Link
//                 className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
//                 to='/contact'
//               >
//                 Contact
//                 <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
//               </Link>
//             </li>

//             <li className='justify-center items-center flex'>
//               <Link
//                 className='items-center text-base text-green-800 font-medium hover:text-green-600 md:mx-4 md:my-0 group'
//                 to='/about'
//               >
//                 About Us
//                 <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div className='flex-1 text-end md:block hidden'>
//           <ul className='flex justify-end items-center'>
//             {Name != '' && isAdmin && (
//               <>
//                 <li>
//                   <Link
//                     className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
//                     to={`/cart`}
//                   >
//                     <div className='flex'>
//                       <div className='mt-1'>
//                         <ShoppingCart />
//                       </div>
//                       <div>({items})</div>
//                     </div>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className='my-1 text-base text-green-800 hover:text-green-600 font-medium m-0 py-2 px-3 md:mx-2 rounded-md'
//                     to='/admin/dashboard'
//                   >
//                     Dashboard
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     className='my-1 text-base text-green-50 font-medium m-0 bg-red-500 hover:bg-red-600 py-2 px-3 md:mx-2 rounded-md'
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//             {Name != '' && isAdmin == false && (
//               <>
//                 <li>
//                   <Link
//                     className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
//                     to={`/cart`}
//                   >
//                     <div className='flex'>
//                       <div className='mt-1'>
//                         <ShoppingCart />
//                       </div>
//                       <div>({items})</div>
//                     </div>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
//                     to={`/user-details/${userId}`}
//                   >
//                     Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     className='my-1 text-base text-green-50 font-medium m-0 bg-red-500 hover:bg-red-600 py-2 px-3 md:mx-2 rounded-md'
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//             {Name === '' && (
//               <>
//                 <li>
//                   <Link
//                     className='my-1 text-base text-green-800 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-green-600'
//                     to={`/cart`}
//                   >
//                     <div className='flex'>
//                       <div className='mt-1'>
//                         <ShoppingCart />
//                       </div>
//                       <div>({items})</div>
//                     </div>
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className='my-1 text-base text-green-50 font-medium m-0 bg-blue-600 hover:bg-blue-900 py-2 px-3 md:mx-2 rounded-md'
//                     to='/login'
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     className='my-1 text-base text-green-50 font-medium m-0 bg-purple-700 hover:bg-purple-500 py-2 px-3 md:mx-2 rounded-md'
//                     to='/registration'
//                   >
//                     Signup
//                   </Link>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </motion.nav>
//     </>
//   );
// };

// export default Navbar;

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LuShoppingCart } from 'react-icons/lu';

import logoT from '@/assets/logoT.png';
import logo from '@/assets/icon.png';

import useAuth from '@/hooks/useAuth';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownHeight, setDropdownHeight] = useState(0);

  const { userId } = useAuth();

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

  return (
    <nav className='bg-primaryBlue border-gray-200'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        {/* Logo and Brand Name */}
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img src={logoT} className='h-16' alt='Logo' />
        </Link>

        {/* User Menu and Dropdown */}
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative'>
          <button
            type='button'
            className='flex text-sm'
            onClick={toggleDropdown}
            aria-expanded={isDropdownOpen}
          >
            <span className='sr-only'>Open user menu</span>
            <img src={logo} className='w-8 h-8 rounded-full bg-gray-300' />
          </button>

          {/* User Dropdown Menu */}
          <Link
            className='my-1 text-base text-black/80 font-medium m-0 py-2 px-3 md:mx-2 rounded-md hover:text-black/50'
            to={`/cart`}
          >
            <div className='flex'>
              <div className='mt-1'>
                <LuShoppingCart />
              </div>
              <div>(0)</div>
            </div>
          </Link>

          <div
            ref={dropdownRef}
            style={{ height: isDropdownOpen ? `${dropdownHeight}px` : '0' }}
            className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-200 ease-in-out z-50 ${
              isDropdownOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className='px-4 py-3 border-b border-gray-100'>
              <span className='block text-sm font-medium'>User Name</span>
              <span className='block text-sm text-gray-500'>
                user@example.com
              </span>
            </div>
            <ul className='py-2'>
              {['Dashboard', 'Settings', 'Earnings', 'Sign out'].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(' ', '')}`}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors'
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

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
