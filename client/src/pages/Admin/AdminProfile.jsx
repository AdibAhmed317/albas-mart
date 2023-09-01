import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';

import hero from '../../assets/hero.jpg';

const AdminProfile = () => {
  return (
    <>
      <Navbar />
      <DropDown />
      <div className='flex md:flex-row flex-col h-screen md:h-full md:justify-center md:items-center bg-green-50'>
        <div>
          <AdminSidebar />
        </div>

        <div className='h-[50%] w-full flex flex-col justify-center items-center mt-10 md:-mt-40 '>
          <img src={hero} className='object-cover rounded-full h-60 w-60' />
          <div className='flex flex-col justify-start items-center h-full w-full flex-1 mt-5'>
            <p>Id</p>
            <p>Email</p>
            <p>Phone</p>
            <h1>Admin Name</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
