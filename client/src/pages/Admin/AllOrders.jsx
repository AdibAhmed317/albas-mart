import { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import NoProductFound from '../../components/Shop/NoProductFound';
import { Search } from '../../assets/icons';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminProductCard from '../../components/Admin/AdminProductCard';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    const accessToken = localStorage.getItem('accessToken');
    const headers = { token: `Bearer ${accessToken}` };
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/`, {
        headers,
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  function formatDateString(timestamp) {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${year}-${month}-${day} ${formattedHours}:${minutes} ${ampm}`;
  }

  return (
    <div className='bg-green-50 h-full'>
      <Navbar />
      <DropDown />
      <div className='flex md:flex-col lg:flex-row flex-col bg-green-50'>
        <AdminSidebar />
        <div className='h-auto w-screen p-5'>
          <h1 className='text-2xl font-normal text-green-900 mb-4'>
            Search Oder
          </h1>
          <div className='mb-4'>
            <input
              type='text'
              placeholder='Search by Order ID'
              className='border border-gray-300 rounded px-4 py-2'
            />
            <button className='bg-green-300 text-green-800 font-medium px-4 py-2 rounded ml-2'>
              Search
            </button>
          </div>
          <div className='mx-auto'>
            <h1 className='text-2xl text-green-900 mb-4'>All Orders</h1>
            <div className='overflow-x-auto'>
              <table className='min-w-full bg-white rounded-lg overflow-hidden'>
                <thead className='bg-gray-200 text-gray-700'>
                  <tr>
                    <th className='py-3 px-4 font-semibold text-sm'>
                      Order ID
                    </th>
                    <th className='py-3 px-4 font-semibold text-sm'>
                      Customer ID
                    </th>
                    <th className='py-3 px-4 font-semibold text-sm'>
                      Order Date
                    </th>
                    <th className='py-3 px-4 font-semibold text-sm'>
                      Total Amount
                    </th>
                    <th className='py-3 px-4 font-semibold text-sm'>Status</th>
                    <th className='py-3 px-4 font-semibold text-sm'>Details</th>
                  </tr>
                </thead>
                <tbody className='text-gray-600'>
                  {orders.map((order) => (
                    <tr
                      key={order.OrderId}
                      className='hover:bg-gray-100 transition duration-300 ease-in-out'>
                      <td className='py-3 px-4 text-center'>{order._id}</td>
                      <td className='py-3 px-4 text-center'>{order.userId}</td>
                      <td className='py-3 px-4 text-center'>
                        {formatDateString(order.createdAt)}
                      </td>
                      <td className='py-3 px-4 text-center'>${order.amount}</td>
                      <td className='py-3 px-4 text-center'>{order.status}</td>
                      <td className='py-3 px-4 text-center'>
                        <Link
                          to={`/admin/order-details/${order._id}`}
                          className='text-blue-500 hover:underline'>
                          Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
