import React from 'react';
import { Link } from 'react-router-dom';

const ProfileSidebar = () => {
  const loggedInId = localStorage.getItem('id');

  return (
    <section className='py-10 text-center text-sm font-normal text-green-900 bg-green-100'>
      <ul className='flex justify-center items-center gap-8'>
        <li>
          <Link to={`/user-details/${loggedInId}`} className='group'>
            Profile
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
        <li>
          <Link to={`/user-details/orders/${loggedInId}`} className='group'>
            Orders
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
        <li>
          <Link to={`/user-details/wishlist/${loggedInId}`} className='group'>
            Wishlist
            <span className='block max-w-0 group-hover:max-w-full transition-all duration-200 h-0.5 bg-green-500'></span>
          </Link>
        </li>
      </ul>
    </section>
  );
};

export default ProfileSidebar;
