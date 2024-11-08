import { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [Name, setName] = useState('');
  const [isAdmin, setIsAdmin] = useState();
  const [userId, setUserId] = useState(''); // Add userId state

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const storedUserId = localStorage.getItem('id'); // Retrieve userId from localStorage

      if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const userName = decodedToken.Name;
        const adminCheck = decodedToken.isAdmin;
        setName(userName);
        setIsAdmin(adminCheck);
      }

      if (storedUserId) {
        setUserId(storedUserId); // Set userId from localStorage
      }
    } catch (error) {
      setName('');
      setIsAdmin(false);
      setUserId(''); // Clear userId on error
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ Name, setName, isAdmin, setIsAdmin, userId }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
