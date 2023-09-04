import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [Name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (id) {
        const getuserId = id;
        setUserId(getuserId);
        console.log(userId);
      }
      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const userName = decodedToken.Name;
        const adminCheck = decodedToken.isAdmin;
        setName(userName);
        setIsAdmin(adminCheck);
      }
    } catch (error) {
      setName('');
      setIsAdmin(false);
    }
  }, []);

  return (
    <UserContext.Provider value={{ Name, setName, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
