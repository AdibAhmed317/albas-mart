import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const headers = { token: `Bearer ${accessToken}` };
      const res = await axios.get('http://localhost:5000/api/user/', {
        headers,
      });
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/user/find/${searchId}`
      );
      setSearchResult(res.data);
    } catch (error) {
      console.log(error);
      setSearchResult(null);
    }
  };

  return (
    <>
      <Navbar />
      <DropDown />
      <div className='flex md:flex-row flex-col bg-green-50'>
        <AdminSidebar />
        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-2xl font-normal text-green-900 mb-4'>
            Search user
          </h1>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Search by ID'
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className='border border-gray-300 rounded px-4 py-2'
            />
            <button
              onClick={handleSearch}
              className='bg-green-300 text-green-800 font-medium px-4 py-2 rounded ml-2'>
              Search
            </button>
          </div>
          {searchResult ? (
            <div className='bg-white p-4 rounded shadow-md mb-10'>
              <h2 className='text-xl font-bold mb-2'>{searchResult.Name}</h2>
              <p>Email: {searchResult.Email}</p>
              <p>Phone: {searchResult.Phone}</p>
            </div>
          ) : (
            <p></p>
          )}
          <div>
            <h1 className='text-2xl text-green-900 mb-4'>All Users</h1>
            <ul className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {data.map((user) => (
                <li
                  key={user.UserId}
                  className='bg-white text-green-900 p-4 rounded shadow-md'>
                  <h2 className='text-xl font-bold mb-2'>{user.Name}</h2>
                  <p>
                    <b>Id:</b> {user._id}
                  </p>
                  <p>
                    <b>Name:</b> {user.Name}
                  </p>
                  <p>
                    <b>Email:</b> {user.Email}
                  </p>
                  <p>
                    <b>Phone:</b> {user.Phone}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
