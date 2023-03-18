import React from 'react';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductList from './pages/ProductList';
import Registration from './pages/Registration';
import SingleProduct from './pages/SingleProduct';
import Success from './components/success';
import PayTest from './components/PayTest';

const App = () => {
  return (
    <div className=' flex justify-center items-center h-screen flex-col'>
      <PayTest />
      <Success />
    </div>
  );
};

export default App;
