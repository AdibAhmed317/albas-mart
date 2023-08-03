import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/user/');
      setData(res.data);
      console.log(data);
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
      <div className='container mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-4'>Users List</h1>
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
          <div className='bg-gray-100 p-4 rounded shadow-md mb-10'>
            <h2 className='text-xl font-bold mb-2'>{searchResult.firstname}</h2>
            <p>Email: {searchResult.email}</p>
            <p>Phone: {searchResult.phone}</p>
          </div>
        ) : (
          <p></p>
        )}
        <div>
          <h1 className='text-2xl font-bold mb-4'>All Users</h1>
          <ul className='grid grid-cols-2 gap-4'>
            {data.map((user) => (
              <li
                key={user.UserId}
                className='bg-gray-100 p-4 rounded shadow-md'>
                <h2 className='text-xl font-bold mb-2'>{user.Name}</h2>
                <p>
                  <b>Id:</b> {user._id}
                </p>
                <p>
                  <b>Name:</b> {user.firstname}
                </p>
                <p>
                  <b>Email:</b> {user.email}
                </p>
                <p>
                  <b>Phone:</b> {user.phone}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
