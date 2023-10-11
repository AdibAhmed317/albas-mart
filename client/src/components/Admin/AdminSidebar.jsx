import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='flex flex-col bg-green-100 overflow-hidden h-full max-w-full md:max-w-[20rem] min-w-auto md:min-w-[20rem]'>
      <h1 className='text-2xl md:text-5xl text-green-900 font-thin p-2 md:p-10 text-center'>
        Admin Dashboard
      </h1>
      <div className='h-full md:h-[90vh] w-full text-center'>
        <ul className='flex md:flex-col overflow-auto'>
          <li className='dashboard-link'>
            <Link to='/admin/dashboard'>All Users</Link>
          </li>
          <li className='dashboard-link'>
            <Link to='/admin/create-product'>Create Product</Link>
          </li>
          <li className='dashboard-link'>
            <Link to='/admin/all-products/'>All Products</Link>
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
