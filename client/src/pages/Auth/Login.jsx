import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Navbar from '../../components/Navbar/Navbar';
import UserContext from '../../context/UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setName } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const loginData = {
        Email: email,
        Password: password,
      };

      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        loginData
      );
      console.log(res.data.accessToken);
      localStorage.setItem('accessToken', res.data.accessToken);
      const decodedToken = jwtDecode(res.data.accessToken);
      const Name = decodedToken.Name;
      setName(Name);
      console.log(Name);
      navigate('/');
    } catch (error) {
      setErrorMessage('Email/Password did not match');
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-auto h-[85vh] bg-green-50 flex items-center justify-center'>
        <div className='p-5 w-[350px] md:w-[25%] bg-green-200' id='wrapper'>
          <h1 className='text-2xl font-light'>SIGN IN</h1>
          <input
            className='flex-1 w-full my-3 mx-0 bg-green-50 p-3'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='flex-1 w-full my-3 mx-0 bg-green-50 p-3'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='w-full mb-3 border-none py-3 px-5 bg-green-900 text-white cursor-pointer'
            onClick={handleSubmit}>
            Login
          </button>
          <a className='my-1 mx-0 text-base underline cursor-pointer text-green-900'>
            Forgot Password?
          </a>
          <br />
          <Link
            className='my-1 mx-0 text-base underline cursor-pointer text-green-900'
            to='/registration'>
            Create new account
          </Link>
          <br />
          <span className='text-red-500'>{errorMessage}</span>
        </div>
      </div>
    </>
  );
};

export default Login;
