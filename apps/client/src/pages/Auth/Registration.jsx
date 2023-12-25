import React, { useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import Dropdown from '../../components/Navbar/DropDown';
import { publicRequest } from '../../network/RequestMethod';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/Footer';

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password and Confirm Password do not match.',
      });
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
      const response = await publicRequest.post(
        'auth/register',
        registrationData
      );

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setPhoneNumber('');
      setAddress('');
      setErrorMessage('');

      // Use SweetAlert2 for the success message
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created.',
        confirmButtonText: 'Login',
      }).then((result) => {
        // Navigate to login page after the user acknowledges the success alert
        if (result.value) {
          navigate('/login');
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      // Use SweetAlert2 for the user already exists error
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'User already exists.',
      });
      setErrorMessage('User Already Exist');
    }
  };

  return (
    <>
      <Navbar />
      <Dropdown />
      <div className='w-auto md:h-[80vh] h-screen bg-green-50 flex items-center justify-center -mb-10'>
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
              className='text-base underline cursor-pointer text-green-900'
              to='/login'>
              Already have an account?
            </Link>
          </span>
          <br />
          <span className='text-red-500'>{errorMessage}</span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
