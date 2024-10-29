import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2';

import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import UserContext from '../../context/UserContext';
import Dropdown from '../../components/Navbar/DropDown';
import { publicRequest } from '../../network/RequestMethod';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { setName } = useContext(UserContext);
  const { setIsAdmin } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
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
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Dropdown />
      <div className='w-auto min-h-[90vh] flex items-center justify-center'>
        <div className='p-5 w-[350px] md:w-[30rem] bg-green-200' id='wrapper'>
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
            onClick={handleSubmit}
          >
            Login
          </button>
          <a className='my-1 mx-0 text-base underline cursor-pointer text-green-900'>
            Forgot Password?
          </a>
          <br />
          <Link
            className='my-1 mx-0 text-base underline cursor-pointer text-green-900'
            to='/registration'
          >
            Create new account
          </Link>
          <br />
          <span className='text-red-500'>{errorMessage}</span>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
