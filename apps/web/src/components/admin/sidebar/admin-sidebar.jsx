import React, { useContext, useState } from 'react';
import logoT from '@/assets/logoT.png';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { MdAddShoppingCart } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { IoClose, IoMenu } from 'react-icons/io5'; // Import the close icon
import Swal from 'sweetalert2';
import UserContext from '@/context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const { setName, setIsAdmin, userId } = useContext(UserContext);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
    <>
      {/* Button to open the sidebar (visible on mobile) */}
      <button
        onClick={toggleSidebar}
        aria-controls='logo-sidebar'
        type='button'
        className='inline-flex items-center h-10 px-4 text-sm bg-primaryBlue text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
      >
        <span className='sr-only'>Open sidebar</span>
        <IoMenu className='h-8 w-8' />
      </button>

      {/* Sidebar */}
      <aside
        id='logo-sidebar'
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform transform bg-primaryBlue shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } sm:translate-x-0`}
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto dark:bg-gray-800'>
          {/* Close button (visible on mobile when sidebar is open) */}
          <button
            onClick={toggleSidebar}
            aria-label='Close sidebar'
            className='sm:hidden text-black absolute top-4 right-4 p-2'
          >
            <IoClose className='w-8 h-8' />
          </button>

          {/* Logo */}
          <Link to='/' className='flex items-center ps-2.5 mb-5'>
            <img src={logoT} className='me-3 h-14 md:h-20' alt='Logo' />
          </Link>

          {/* Menu items */}
          <ul className='space-y-2 font-medium'>
            <li>
              <Link
                to={`/admin-dashboard/${userId}`}
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primaryRed dark:hover:bg-gray-700 group'
              >
                <MdOutlineSpaceDashboard />
                <span className='ms-3'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/admin/create-product/${userId}`}
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primaryRed dark:hover:bg-gray-700 group'
              >
                <MdOutlineProductionQuantityLimits />
                <span className='flex-1 ms-3 whitespace-nowrap'>Product</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/admin/all-orders/${userId}`}
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primaryRed dark:hover:bg-gray-700 group'
              >
                <MdAddShoppingCart />
                <span className='flex-1 ms-3 whitespace-nowrap'>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/admin-profile/${userId}`}
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primaryRed dark:hover:bg-gray-700 group'
              >
                <CgProfile />
                <span className='flex-1 ms-3 whitespace-nowrap'>Profile</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-primaryRed dark:hover:bg-gray-700 w-full'
              >
                <PiSignOutBold />
                <span className='flex-1 ms-3 whitespace-nowrap text-start'>
                  Sign Out
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
