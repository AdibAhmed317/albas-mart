import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext.jsx';
import { NavbarProvider } from './context/NavbarContext.jsx';
import Notice from './components/Notice.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavbarProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </NavbarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
