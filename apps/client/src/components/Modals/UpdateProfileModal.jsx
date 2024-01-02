import React, { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { motion } from 'framer-motion';
import axios from 'axios';
import { userRequest } from '../../network/RequestMethod';

const UpdateProfileModal = ({ isOpen, onClose, customer }) => {
  const [updatedCustomer, setUpdatedCustomer] = useState({
    Name: customer.Name,
    Address: customer.Address,
    Phone: customer.Phone,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await userRequest.put(
        `user/${customer._id}`,
        updatedCustomer
      );

      if (res.status === 200) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              delay: 0.175,
            }}
            className='absolute bg-green-200 p-8 rounded-sm w-[30%] max-h-[60%] overflow-auto'>
            <button
              onClick={onClose}
              className='transition-all text-red-500 hover:bg-red-500 hover:text-white m-2 rounded-lg text-2xl absolute top-0 right-0'>
              <RxCross2 />
            </button>
            <h2 className='text-2xl text-center font-base mb-4'>
              Update Profile
            </h2>
            <section>
              <form onSubmit={handleSubmit}>
                <label className='mx-1'>
                  Name
                  <input
                    className='bg-green-100 p-2 m-1 w-full'
                    type='text'
                    name='Name'
                    value={updatedCustomer.Name}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label className='mx-1'>
                  Address
                  <input
                    className='bg-green-100 p-2 m-1 w-full'
                    type='text'
                    name='Address'
                    value={updatedCustomer.Address}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label className='mx-1'>
                  Phone
                  <input
                    className='bg-green-100 p-2 m-1 w-full'
                    type='text'
                    name='Phone'
                    value={updatedCustomer.Phone}
                    onChange={handleInputChange}
                  />
                </label>
                <input
                  className='m-1 mt-5 p-2 transition-all text-sm bg-green-600 hover:bg-green-500 text-white hover:text-green-900 cursor-pointer rounded-lg'
                  type='submit'
                  value='Save Changes'
                />
              </form>
            </section>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default UpdateProfileModal;
