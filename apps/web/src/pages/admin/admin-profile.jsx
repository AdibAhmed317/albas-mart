import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/navbar';
import Footer from '../../components/footer/footer';
import DropDown from '../../components/navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';

import { publicRequest } from '../../network/RequestMethod';
import UpdateProfileModal from '../../components/Modals/UpdateProfileModal';
import DeleteProfileModal from '../../components/Modals/DeleteProfileModal';

const AdminProfile = () => {
  const [adminData, setAdminData] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    const userId = localStorage.getItem('id');
    try {
      const res = await publicRequest.get(`user/find/${userId}`);
      setAdminData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <AdminSidebar />
      <div className='bg-green-50 flex justify-center items-center min-h-[70vh]'>
        <div className='flex justify-center'>
          <div className='bg-green-200 shadow-md rounded p-6 max-w-2xl w-full text-green-900'>
            <h1 className='text-4xl font-thin text-center'>
              Admin Information
            </h1>
            <div className='grid grid-cols-2 gap-y-4 text-xl mt-6'>
              <div className='text-left'>
                <p className='my-3 text-base'>
                  <strong>ID:</strong>
                </p>
                <p className='my-3 text-base'>
                  <strong>Name:</strong>
                </p>
                <p className='my-3 text-base'>
                  <strong>Email:</strong>
                </p>
                <p className='my-3 text-base'>
                  <strong>Address:</strong>
                </p>
                <p className='my-3 text-base'>
                  <strong>Phone:</strong>
                </p>
              </div>
              <div className='text-left overflow-auto'>
                <p className='my-3 text-base'>{adminData._id}</p>
                <p className='my-3 text-base'>{adminData.Name}</p>
                <p className='my-3 text-base'>{adminData.Email}</p>
                <p className='my-3 text-base'>{adminData.Address}</p>
                <p className='my-3 text-base'>{adminData.Phone}</p>
              </div>
            </div>
            <div className='flex gap-1 mt-10'>
              <button
                onClick={openModal}
                className='bg-blue-600 hover:bg-blue-500 transition-all text-white p-2 rounded-lg text-xs'
              >
                Update Profile
              </button>
              {isModalOpen && (
                <UpdateProfileModal
                  customer={adminData}
                  isOpen={isModalOpen}
                  onClose={closeModal}
                />
              )}

              <button
                onClick={openDeleteModal}
                className='bg-red-600 hover:bg-red-500 transition-all text-white p-2 rounded-lg text-xs'
              >
                Delete Account
              </button>
              {isDeleteModalOpen && (
                <DeleteProfileModal
                  isOpen={isDeleteModalOpen}
                  onClose={closeDeleteModal}
                  customerId={adminData._id}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminProfile;
