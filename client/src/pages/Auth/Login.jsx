import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Navbar />
      <div className='w-auto h-[85vh] bg-green-50 flex items-center justify-center'>
        <div className='p-5 w-[350px] md:w-[25%] bg-green-200' id='wrapper'>
          <h1 className='text-2xl font-light'>SIGN IN</h1>
          <form className='flex flex-col'>
            <input
              className='flex-1 min-w-[40%] my-3 mx-0 bg-green-50 p-3'
              placeholder='Email'
            />
            <input
              className='flex-1 min-w-[40%] my-3 mx-0 bg-green-50 p-3'
              type='password'
              placeholder='Password'
            />
            <button className='w-full mb-3 border-none py-3 px-5 bg-green-900 text-white cursor-pointer'>
              Login
            </button>
            <a className='my-1 mx-0 text-base underline cursor-pointer text-green-900'>
              Forgot Password?
            </a>
            <Link
              className='my-1 mx-0 text-base underline cursor-pointer text-green-900'
              to='/registration'>
              Create new account
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

// {error && (
//     <span className='text-red-500'>Something went wrong</span>
//   )}
