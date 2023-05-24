import React, { useState } from 'react';
import { login } from '../redux/apiCalls';
import Navbar from '../components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <>
      <Navbar />
      <div
        className='w-auto h-screen bg-green-50 flex items-center justify-center'
        id='container'
      >
        <div className='p-5 w-[350px] md:w-[25%] bg-green-200' id='wrapper'>
          <h1 className='text-2xl font-light'>SIGN IN</h1>
          <form className='flex flex-col'>
            <input
              className='flex-1 min-w-[40%] my-3 mx-0 bg-green-50 p-3'
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className='flex-1 min-w-[40%] my-3 mx-0 bg-green-50 p-3'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='text-sm my-5 mx-0' id='agreement'>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button
              onClick={handleLogin}
              disabled={isFetching}
              className='w-[40%] mb-3 border-none py-3 px-5 bg-green-900 text-white cursor-pointer'
            >
              Login
            </button>
            {error && (
              <span className='text-red-500'>Something went wrong</span>
            )}
            <a className='my-2 mx-0 text-base md:text-xs underline cursor-pointer text-green-900'>
              Forgot Password?
            </a>
            <a className='my-2 mx-0 text-base md:text-xs underline cursor-pointer text-green-900'>
              Create new account
            </a>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
