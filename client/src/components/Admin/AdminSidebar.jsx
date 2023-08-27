import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='flex flex-col bg-green-100 overflow-hidden'>
      <h1 className='text-5xl text-green-900 font-thin p-10 text-center'>
        Admin Dashboard
      </h1>
      <div className='h-auto md:h-[90vh] w-full text-center'>
        <ul className='flex md:flex-col overflow-auto'>
          <li className='dashboard-link'>
            <Link to='/admin/dashboard'>All Users</Link>
          </li>
          <li className='dashboard-link'>
            <Link to='/admin/create-product'>Create Product</Link>
          </li>
          <li className='dashboard-link'>
            <Link to='/'>All Products</Link>
          </li>
          <li className='dashboard-link'>
            <Link to='/admin/all-orders'>All Orders</Link>
          </li>
          <li className='dashboard-link'>
            <Link to='/admin/profile'>Admin Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
