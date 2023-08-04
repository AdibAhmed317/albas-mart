import React from 'react';
import HomePage from './pages/Client/HomePage';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Shop from './pages/Client/Shop';

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
