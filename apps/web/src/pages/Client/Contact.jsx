import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import Footer from '../../components/Footer/Footer';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <>
      <Navbar />
      <DropDown />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'keyframes',
          delay: 0.175,
        }}
        className='min-h-screen w-full flex justify-center items-center'
      >
        <div className='flex flex-col'>
          <h1 className='text-4xl md:text-5xl font-thin text-center text-green-800 mt-16'>
            Contact Us
          </h1>
          <div className='flex flex-col h-full w-[20rem] md:w-[30rem] justify-center md:items-start m-10'>
            <input
              className='bg-green-200 w-full h-12 pl-3 rounded-lg placeholder:text-green-800'
              type='text'
              placeholder='Name'
              name='user_name'
            />
            <br />
            <input
              className='bg-green-200 w-full h-12 pl-3 rounded-lg placeholder:text-green-800'
              type='text'
              placeholder='Subject'
              name='user_subject'
            />
            <br />
            <input
              className='bg-green-200 w-full h-12 pl-3 rounded-lg placeholder:text-green-800'
              type='email'
              placeholder='Email'
              name='user_email'
            />
            <textarea
              className='bg-green-200 w-full my-5 pl-3 rounded-lg placeholder:text-green-800'
              rows='5'
              placeholder='Message'
              name='message'
            />
            <div className='w-full flex justify-center items-center'>
              <button className='bg-green-900 w-1/2 p-4 rounded-lg hover:bg-green-400 font-mono text-green-100 hover:text-green-900'>
                Send
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default Contact;

{
  /* <div className='h-full flex flex-col md:flex-row pb-20 md:pb-0'>
<div id='left' className='flex-1 h-screen'>
  <div className='flex h-full w-full justify-center items-center'>
    <img
      src={info}
      className='justify-center items-center h-auto md:h-96 w-auto md:w-3/4'
    />
  </div>
</div>
<div id='right' className='flex-1 h-screen'>
  <div className='flex flex-col h-full w-[70%] justify-center md:items-start ml-14 md:ml-0'>
    <input
      className='bg-gray-400 w-full h-12 pl-3 rounded-lg placeholder:text-black'
      type='text'
      placeholder='Name'
      name='user_name'
    />
    <br />
    <input
      className='bg-gray-400 w-full h-12 pl-3 rounded-lg placeholder:text-black'
      type='text'
      placeholder='Subject'
      name='user_subject'
    />
    <br />
    <input
      className='bg-gray-400 w-full h-12 pl-3 rounded-lg placeholder:text-black'
      type='email'
      placeholder='Email'
      name='user_email'
    />
    <textarea
      className='bg-gray-400 w-full my-5 pl-3 rounded-lg placeholder:text-black'
      rows='5'
      placeholder='Message'
      name='message'
    />
    <button>
      <h1 className='bg-yellow-200 p-4 w-40 rounded-lg hover:bg-gray-400 font-mono'>
        Send
      </h1>
    </button>
  </div>
</div> */
}
