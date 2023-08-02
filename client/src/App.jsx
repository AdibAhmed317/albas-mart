import React from 'react';
import HomePage from './pages/Client/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Login from './pages/Auth/Login';
import Registration from './pages/Auth/Registration';
import Shop from './pages/Client/Shop';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/shop' element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
