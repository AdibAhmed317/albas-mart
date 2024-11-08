import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';

import Navbar from '@/components/navbar/Navbar.jsx';
import Footer from '@/components/footer/Footer.jsx';
import UserContext from '@/context/UserContext.jsx';
import { publicRequest } from '@/network/request-method.js';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { setName, setIsAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Validate input fields
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Please fill in both fields.',
      });
      return; // Exit if validation fails
    }

    setLoading(true); // Start loading
    setErrorMessage(''); // Clear previous errors

    try {
      const loginData = {
        Email: email,
        Password: password,
      };

      const res = await publicRequest.post('auth/login', loginData);

      localStorage.setItem('accessToken', res.data.accessToken);
      localStorage.setItem('id', res.data._id);

      const decodedToken = jwtDecode(res.data.accessToken);

      const Name = decodedToken.Name;
      const adminCheck = decodedToken.isAdmin;

      setName(Name);
      setIsAdmin(adminCheck);
      navigate('/');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email/Password did not match!',
      });
      setErrorMessage('Email/Password did not match');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <>
      <Navbar />
      <div className='min-h-[90vh] flex items-center justify-center bg-gray-100 py-12'>
        <div className='w-full max-w-md p-8 bg-primaryBlue rounded-lg shadow-md'>
          <h1 className='text-3xl font-semibold text-gray-800 text-center mb-6'>
            Sign In
          </h1>
          <form onSubmit={handleSubmit}>
            {' '}
            {/* Use a form element */}
            <input
              className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-primaryGreen focus:outline-none'
              placeholder='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required // Add required attribute
            />
            <input
              className='w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring focus:ring-primaryGreen focus:outline-none'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required // Add required attribute
            />
            <button
              type='submit' // Set type to "submit" for the button
              className={`w-full py-3 mb-3 text-white rounded-lg ${
                loading
                  ? 'bg-primaryGreen cursor-not-allowed'
                  : 'bg-green-600 hover:bg-primaryRed cursor-pointer'
              }`}
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
            {errorMessage && (
              <p className='text-red-500 text-center mb-4'>{errorMessage}</p>
            )}
            <div className='flex justify-between items-center'>
              <a className='text-sm text-green-600 hover:underline cursor-pointer'>
                Forgot Password?
              </a>

              <Link
                className='text-sm text-green-600 hover:underline cursor-pointer'
                to='/sign-up'
              >
                Create new account
              </Link>
            </div>
          </form>{' '}
          {/* Close the form element */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
