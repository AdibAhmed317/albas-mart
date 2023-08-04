import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [Name, setName] = useState('');

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const userName = decodedToken.Name;
        setName(userName);
      }
    } catch (error) {
      setName('');
    }
  }, []);

  return (
    <UserContext.Provider value={{ Name, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
