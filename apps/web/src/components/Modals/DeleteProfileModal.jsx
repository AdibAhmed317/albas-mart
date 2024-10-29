import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross2 } from 'react-icons/rx';
import { userRequest } from '../../network/RequestMethod';
import { useNavigate } from 'react-router-dom';

const DeleteProfileModal = ({ isOpen, onClose, customerId }) => {
  const [confirmationText, setConfirmationText] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setConfirmationText(e.target.value);
  };

  const isDeleteButtonDisabled = confirmationText !== 'Confirm-Delete-Account';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (confirmationText === 'Confirm-Delete-Account') {
      try {
        const res = await userRequest.delete(`user/${customerId}`);

        if (res.status === 200) {
          onClose();
          localStorage.clear();
          navigate('/');
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
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
            <section>
              <form onSubmit={handleSubmit}>
                <label className='mx-1 text-lg'>
                  To delete your account please type{' '}
                  <b>Confirm-Delete-Account</b>
                  <input
                    className='bg-green-100 p-2 m-1 w-full text-black'
                    type='text'
                    value={confirmationText}
                    onChange={handleInputChange}
                  />
                </label>
                <input
                  className={`m-1 mt-5 p-2 transition-all text-sm ${
                    isDeleteButtonDisabled
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-500 text-white hover:text-black cursor-pointer'
                  } rounded-lg`}
                  type='submit'
                  value='Delete Account'
                  disabled={isDeleteButtonDisabled}
                />
              </form>
            </section>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default DeleteProfileModal;
