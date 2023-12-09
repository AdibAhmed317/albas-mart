import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Dropdown from '../../../components/Navbar/DropDown';
import ProfileSidebar from '../../../components/Profile/ProfileSidebar';

const Wishlist = () => {
  return (
    <>
      <Navbar />
      <Dropdown />
      <ProfileSidebar />
      Wishlist
    </>
  );
};

export default Wishlist;
