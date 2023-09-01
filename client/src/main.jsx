import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { NavbarProvider } from './context/NavbarContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NavbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
