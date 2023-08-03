import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [Name, setName] = useState('');

  return (
    <UserContext.Provider value={{ Name, setName }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
