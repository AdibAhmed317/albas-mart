import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import NavbarContext from '../../context/NavbarContext';

const Dropdown = () => {
  const { toggle, isOpen } = useContext(NavbarContext);
  //   console.log(toggle, isOpen);
  return (
    <div
      className={
        isOpen
          ? 'grid grid-cols-1 text-center items-center bg-green-300 text-green-900 w-full h-full'
          : 'hidden'
      }>
      <Link to='#intro' className='p-4 cursor-pointer'>
        Home
      </Link>
      <Link to='#about' className='p-4 cursor-pointer'>
        About
      </Link>
      <Link to='#projects' className='p-4 cursor-pointer'>
        Projects
      </Link>
      <Link to='#contact' className='p-4 cursor-pointer'>
        Contact
      </Link>
    </div>
  );
};

export default Dropdown;
