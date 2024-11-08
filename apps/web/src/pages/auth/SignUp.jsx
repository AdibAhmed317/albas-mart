import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { publicRequest } from '@/network/RequestMethod';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, email, password, confirmPassword, phoneNumber, address } =
      formData;

    // Check if all fields are filled
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !address
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields are required!',
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Passwords do not match!',
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

      await publicRequest.post('auth/register', registrationData);

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        address: '',
      });

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Your account has been created.',
        confirmButtonText: 'Login',
      }).then(() => {
        navigate('/sign-in');
      });
    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: 'User already exists.',
      });
      setErrorMessage('User already exists');
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='p-6 w-full max-w-lg bg-primaryBlue shadow-lg rounded-lg'>
          <h1 className='text-3xl font-semibold mb-6 text-gray-800'>
            Create an Account
          </h1>

          <div className='flex flex-col space-y-4'>
            <input
              className='p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-500 focus:outline-none'
              type='text'
              name='name'
              placeholder='Full Name'
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className='p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-500 focus:outline-none'
              type='email'
              name='email'
              placeholder='Email Address'
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className='p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-500 focus:outline-none'
              type='tel'
              name='phoneNumber'
              placeholder='Phone Number'
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <input
              className='p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-500 focus:outline-none'
              type='text'
              name='address'
              placeholder='Address'
              value={formData.address}
              onChange={handleChange}
              required
            />
            <input
              className='p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-500 focus:outline-none'
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              className='p-3 rounded-md border border-gray-300 focus:ring focus:ring-green-500 focus:outline-none'
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className='mt-6 w-full bg-primaryGreen text-white py-3 rounded-md font-semibold hover:bg-primaryRed transition duration-300'
            onClick={handleSubmit}
          >
            Sign Up
          </button>

          <p className='mt-4 text-sm text-gray-600'>
            Already have an account?{' '}
            <Link className='text-primaryGreen hover:underline' to='/sign-in'>
              Sign In
            </Link>
          </p>

          {errorMessage && (
            <p className='mt-4 text-sm text-red-500'>{errorMessage}</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
