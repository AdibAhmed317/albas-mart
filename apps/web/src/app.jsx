import React from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from '@/pages/auth/sign-in';
import SignUp from '@/pages/auth/sign-up';

import AdminDashboard from '@/pages/admin/admin-dashboard';
import AllOrders from '@/pages/admin/admin-all-orders';
import AdminProfile from '@/pages/admin/admin-profile';

import HomePage from '@/pages/client/home-page';
import SingleProduct from '@/pages/client/single-product';
import UserProfile from '@/pages/client/profile/user-profile';
import About from '@/pages/client/about';
import Shop from '@/pages/client/shop';
import Cart from '@/pages/client/cart';
import Contact from '@/pages/client/contact';
import AdminProduct from '@/pages/admin/admin-product';
import AdminPos from './pages/admin/admin-pos';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/shop/:category' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<SingleProduct />} />

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/user-profile/:id' element={<UserProfile />} />

        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/pos' element={<AdminPos />} />
        <Route path='/admin/create-product' element={<AdminProduct />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
        <Route path='/admin/all-orders' element={<AllOrders />} />
      </Routes>
    </>
  );
}

export default App;
