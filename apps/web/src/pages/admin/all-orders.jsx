import { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

import Navbar from '../../components/navbar/navbar';
import DropDown from '../../components/navbar/DropDown';
import NoProductFound from '../../components/Shop/NoProductFound';
import { Search } from '../../assets/icons';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminProductCard from '../../components/Admin/AdminProductCard';
import { userRequest } from '../../network/RequestMethod';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const res = await userRequest.get(`orders/`);

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

    return `${day}-${month}-${year} ${formattedHours}:${minutes} ${ampm}`;
  }

  return (
    <>
      <Navbar />
      <AdminSidebar />
      <div className='bg-green-50 overflow-x-auto text-center px-10 py-2 md:min-h-[80vh]'>
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
            <table className='overflow-hidden w-full rounded-t-md'>
              <thead className='bg-green-200 text-gray-700'>
                <tr>
                  <th className='py-3 px-4 font-semibold text-sm'>Order ID</th>
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
                    key={order._id}
                    className='hover:bg-green-100 transition duration-300 ease-in-out'
                  >
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
                        className='text-blue-500 hover:underline'
                      >
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
    </>
  );
};

export default AllOrders;
