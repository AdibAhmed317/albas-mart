import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Profile = () => {
  const location = useLocation();
  const customerId = location.pathname.split('/')[2];
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  const fetchCustomerDetails = () => {
    axios
      .get(`http://localhost:5000/api/user/find/${customerId}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer details:', error);
      });
  };

  if (!customer) {
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'keyframes',
          delay: 0.175,
        }}
        className='bg-green-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto md:max-w-2xl'>
          <div className='md:flex'>
            <div className='md:flex-shrink-0'>
              <img
                className='h-48 w-full object-cover md:w-48'
                src='https://via.placeholder.com/150'
                alt='Customer Profile'
              />
            </div>
            <div className='p-8'>
              <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                Profile
              </div>
              <h2 className='mt-2 text-2xl leading-7 font-semibold text-gray-900'>
                {customer.Name}
              </h2>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  <strong>Customer ID:</strong> {customer._id}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Email:</strong> {customer.Email}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Address:</strong> {customer.Address}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Phone:</strong> {customer.Phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Profile;
