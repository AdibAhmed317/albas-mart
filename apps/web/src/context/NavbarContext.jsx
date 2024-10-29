import { createContext, useEffect, useState } from 'react';

const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', hideMenu);

    return () => {
      window.removeEventListener('resize', hideMenu);
    };
  });

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContext;
