import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';

import hero from '../../assets/hero.jpg';
import axios from 'axios';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState('');

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const userId = localStorage.getItem('id');
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/find/${userId}`
      );
      setAdminData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <DropDown />
      <div className='flex md:flex-row flex-col h-screen md:h-full md:justify-between md:items-center bg-green-50'>
        <div className='w-[20%]'>
          <AdminSidebar />
        </div>

        <div className='w-screen md:w-1/2 h-full mt-5 md:-mt-10 md:ml-0'>
          <div className='bg-white rounded-lg shadow-lg w-auto md:w-1/2'>
            <div className='md:flex'>
              <div className='md:flex-shrink-0'>
                <img
                  className='h-48 w-full object-cover md:w-48'
                  src={hero}
                  alt='Customer Profile'
                />
              </div>
              <div className='p-8'>
                <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                  Admin Details
                </div>
                <h2 className='mt-2 text-2xl leading-7 font-semibold text-gray-900'></h2>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    <strong>Admin ID:</strong> {adminData._id}
                  </p>
                  <p className='text-sm text-gray-500'>
                    <strong>Email:</strong> {adminData.Email}
                  </p>
                  <p className='text-sm text-gray-500'>
                    <strong>Address:</strong> {adminData.Address}
                  </p>
                  <p className='text-sm text-gray-500'>
                    <strong>Phone:</strong> {adminData.Phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
