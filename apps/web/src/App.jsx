import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import SignIn from '@/pages/auth/SignIn.jsx';
// import SignUp from '@/pages/auth/SignUp.jsx';

// import AdminDashboard from '@/pages/admin/AdminDashboard.jsx';
// import AllOrders from '@/pages/admin/AllOrders.jsx';
// import AdminProfile from '@/pages/admin/AdminProfile.jsx';

import HomePage from '@/pages/client/home-page.jsx';
// import SingleProduct from '@/pages/client/SingleProduct.jsx';
// import UserProfile from '@/pages/client/profile/UserProfile.jsx';
// import About from '@/pages/client/About.jsx';
// import Shop from '@/pages/client/Shop.jsx';
// import Cart from '@/pages/client/Cart.jsx';
// import Contact from '@/pages/client/Contact.jsx';
// import AdminProduct from '@/pages/admin/AdminProduct.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path='/shop/:category' element={<Shop />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/product/:id' element={<SingleProduct />} />

        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/user-profile/:id' element={<UserProfile />} />

        <Route path='/admin-dashboard/:id' element={<AdminDashboard />} />
        <Route path='/admin-profile/:id' element={<AdminProfile />} />
        <Route path='/admin/create-product/:id' element={<AdminProduct />} />
        <Route path='/admin/all-orders/:id' element={<AllOrders />} /> */}
      </Routes>
    </>
  );
}

export default App;
