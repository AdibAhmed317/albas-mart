import React from 'react';
import Navbar from '../components/Navbar';

const Registration = () => {
  return (
    <>
      <Navbar />
      <div
        className='w-auto h-screen bg-green-50 flex items-center justify-center'
        id='container'
      >
        <div className='p-5 w-[350px] md:w-[40%] bg-green-200' id='wrapper'>
          <h1 className='text-2xl font-light'>CREATE AN ACCOUNT</h1>
          <form className='flex flex-wrap'>
            <input
              className='flex-1 min-w-[40%] mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
              placeholder='First Name'
            />
            <input
              className='flex-1 min-w-[40%] mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
              placeholder='Last Name'
            />
            <input
              className='flex-1 min-w-[40%] mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
              placeholder='Email'
            />
            <input
              className='flex-1 min-w-[40%] mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
              placeholder='Password'
            />
            <input
              className='flex-1 min-w-[40%] mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
              placeholder='Phone Number'
            />
            <input
              className='flex-1 min-w-[40%] mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
              placeholder='Confirm Password'
            />
            <br />
            <span className='text-sm my-5 mx-0' id='agreement'>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button className='w-[40%] border-none py-3 px-5 bg-green-900 text-white cursor-pointer'>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
