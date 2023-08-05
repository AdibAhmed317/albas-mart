import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Password and Confirm Password do not match.');
      return;
    }
    try {
      const registrationData = {
        Name: name,
        Email: email,
        Password: password,
        Phone: phoneNumber,
        Address: address,
      };
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        registrationData
      );

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setAddress('');
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage('User Already Exist');
    }
  };

  return (
    <>
      <Navbar />
      <div className='w-auto md:h-[85vh] h-screen bg-green-50 flex items-center justify-center'>
        <div className='p-5 w-[350px] md:w-[40%] bg-green-200'>
          <h1 className='text-2xl font-light'>CREATE AN ACCOUNT</h1>
          <input
            className='flex-1 md:w-[40%] w-full mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='flex-1 md:w-[40%] w-full mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='flex-1 md:w-[40%] w-full mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
            placeholder='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            className='flex-1 md:w-[40%] w-full mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            className='flex-1 md:w-[40%] w-full mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className='flex-1 md:w-[40%] w-full mt-5 mr-3 mb-0 ml-0 bg-green-50 p-3'
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <br />
          <button
            className='w-[40%] border-none py-2 px-5 text-center bg-green-900 text-white cursor-pointer mt-5 md:mt-10'
            onClick={handleSubmit}>
            Create
          </button>
          <br />
          <span className='text-sm my-5 mx-0'>
            <Link
              className='my-2 mx-0 text-base underline cursor-pointer text-green-900'
              to='/login'>
              Already have an account?
            </Link>
          </span>
          <br />
          <span className='text-red-500'>{errorMessage}</span>
        </div>
      </div>
    </>
  );
};

export default Registration;
