import React, { useContext, useState } from 'react';
import logoT from '@/assets/images/basic/logoT.png';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { MdAddShoppingCart, MdPointOfSale } from 'react-icons/md';
import { PiSignOutBold } from 'react-icons/pi';
import { CgProfile } from 'react-icons/cg';
import { IoClose, IoMenu } from 'react-icons/io5';
import Swal from 'sweetalert2';
import UserContext from '@/context/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { setName, setIsAdmin, userId } = useContext(UserContext);

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

  const menuItems = [
    {
      icon: <MdOutlineSpaceDashboard size={20} />,
      text: 'Dashboard',
      link: '/admin/dashboard',
    },
    { icon: <MdPointOfSale size={20} />, text: 'POS', link: '/admin/pos' },
    {
      icon: <MdOutlineProductionQuantityLimits size={20} />,
      text: 'Product',
      link: '/admin/create-product',
    },
    {
      icon: <MdAddShoppingCart size={20} />,
      text: 'Online Orders',
      link: '/admin/all-orders',
    },
    { icon: <CgProfile size={20} />, text: 'Profile', link: '/admin/profile' },
  ];

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <div className='fixed top-0 left-0 z-50 w-full bg-primaryBlue sm:hidden'>
        <div className='flex items-center justify-between px-4 py-2'>
          <Link to='/' className='flex items-center'>
            <img src={logoT} className='h-10' alt='Logo' />
          </Link>
          <button
            onClick={toggleSidebar}
            className='p-2 text-white hover:bg-blue-700 rounded-lg transition-colors'
          >
            {isSidebarOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`fixed top-14 left-0 right-0 z-40 bg-primaryBlue transform transition-transform duration-300 ease-in-out sm:hidden ${
          isSidebarOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className='px-4 py-2'>
          <ul className='space-y-1'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className='flex items-center p-3 text-black rounded-lg hover:bg-primaryRed transition-colors'
                  onClick={toggleSidebar}
                >
                  {item.icon}
                  <span className='ml-3'>{item.text}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  toggleSidebar();
                  handleSignOut();
                }}
                className='w-full flex items-center p-3 text-black rounded-lg hover:bg-primaryRed hover:text-white transition-colors'
              >
                <PiSignOutBold size={20} />
                <span className='ml-3'>Sign Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className='hidden sm:block fixed top-0 left-0 z-40 w-64 h-screen bg-primaryBlue shadow-2xl'
        aria-label='Sidebar'
      >
        <div className='h-full px-3 py-4 overflow-y-auto'>
          <Link to='/' className='flex items-center ps-2.5 mb-5'>
            <img src={logoT} className='h-14 md:h-20' alt='Logo' />
          </Link>

          <ul className='space-y-2'>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className='flex items-center p-2 text-black rounded-lg hover:bg-primaryRed hover:text-white transition-colors group'
                >
                  {item.icon}
                  <span className='ml-3'>{item.text}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={handleSignOut}
                className='w-full flex items-center p-2 text-black rounded-lg hover:bg-primaryRed hover:text-white transition-colors'
              >
                <PiSignOutBold size={20} />
                <span className='ml-3 text-left'>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden'
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default AdminSidebar;
