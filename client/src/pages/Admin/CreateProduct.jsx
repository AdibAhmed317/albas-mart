import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const CreateProduct = () => {
  return (
    <>
      <>
        <Navbar />
        <DropDown />
        <div className='flex md:flex-row flex-col bg-green-50'>
          <AdminSidebar />
          <div className='container mx-auto px-4 py-8'>
            <h1 className='text-2xl font-normal text-green-900 mb-4'>
              Create product
            </h1>
            <div className='mb-4'>
              <label className='block text-gray-700'>Product Name</label>
              <input
                type='text'
                name='ProductName'
                className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                required
              />
            </div>
            <div>
              <h1 className='text-2xl text-green-900 mb-4'>All Users</h1>
              <ul className='grid grid-cols-2 gap-4'></ul>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CreateProduct;
