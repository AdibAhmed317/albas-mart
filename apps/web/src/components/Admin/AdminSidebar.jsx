import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <section className='py-10 text-center text-sm font-normal text-green-900 bg-green-100 overflow-auto'>
      <ul className='flex justify-center items-center gap-8'>
        <li>
          <Link to='/admin/dashboard' className='group'>
            All Users
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
        <li>
          <Link to='/admin/create-product' className='group'>
            Create Product
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
        <li>
          <Link to='/admin/all-products/' className='group'>
            All Products
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
        <li>
          <Link to='/admin/all-orders' className='group'>
            All Orders
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
        <li>
          <Link to='/admin/profile' className='group'>
            Admin Profile
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default AdminSidebar;

{
  /* <div className='flex flex-col bg-green-100 overflow-hidden h-full max-w-full md:max-w-[20rem] min-w-auto md:min-w-[20rem]'>
<h1 className='text-2xl md:text-5xl text-green-900 font-thin p-2 md:p-10 text-center'>
  Admin Dashboard
</h1>
<div className='h-full md:h-[90vh] w-full text-center'>
  <ul className='flex md:flex-col overflow-auto'>
    <li className='dashboard-link'>
      <Link to=>All Users</Link>
    </li>
    <li className=>
      <Link to=></Link>
    </li>
    <li className='dashboard-link'>
      <Link to=></Link>
    </li>
    <li className='dashboard-link'>
      <Link to=></Link>
    </li>
    <li className='dashboard-link'>
      <Link to=></Link>
    </li>
  </ul>
</div>
</div> */
}
