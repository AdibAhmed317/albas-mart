import React, { useState } from 'react';
import HomePage from './pages/Client/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Shop from './pages/Client/Shop';
import Dropdown from './components/Navbar/Dropdown';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </>
  );
}

export default App;
