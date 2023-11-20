import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/Client/HomePage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Shop from './pages/Client/Shop';
import Cart from './pages/Client/Cart';
import Contact from './pages/Client/Contact';
import About from './pages/Client/About';
import CreateProduct from './pages/Admin/CreateProduct';
import AllProducts from './pages/Admin/AllProducts';
import AllOrders from './pages/Admin/AllOrders';
import AdminProfile from './pages/Admin/AdminProfile';
import UserDetails from './pages/Admin/UserDetails';
import OrderDetails from './pages/Admin/OrderDetails';
import Profile from './pages/Client/Profile';
import SingleProduct from './pages/Client/SingleProduct';

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

        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/user-details/:id' element={<Profile />} />

        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/admin/create-product' element={<CreateProduct />} />
        <Route path='/admin/all-products' element={<AllProducts />} />
        <Route path='/admin/all-orders' element={<AllOrders />} />
        <Route path='/admin/order-details/:id' element={<OrderDetails />} />
        <Route path='/admin/user-details/:id' element={<UserDetails />} />
        <Route path='/admin/profile' element={<AdminProfile />} />
      </Routes>
    </>
  );
}

export default App;
