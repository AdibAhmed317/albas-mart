import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import Dropdown from '../../../components/Navbar/DropDown';
import { userRequest } from '../../../network/RequestMethod';
import ProfileSidebar from '../../../components/Profile/ProfileSidebar';
import Footer from '../../../components/Footer/Footer';
import { motion } from 'framer-motion';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const loggedinId = localStorage.getItem('id');

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    try {
      const res = await userRequest.get(`orders/find/${loggedinId}`);

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

    return `${day}-${month}-${year} (${formattedHours}:${minutes} ${ampm})`;
  }

  return (
    <>
      <Navbar />
      <Dropdown />
      <ProfileSidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          type: 'keyframes',
          delay: 0.175,
        }}
        className='bg-green-50'>
        <h1 className='text-3xl text-center text-green-900 p-8'>All Orders</h1>
        <div className='overflow-x-auto md:min-h-[60vh] px-10'>
          <table className='min-w-full overflow-hidden rounded-t-md'>
            <thead className='text-green-900 bg-green-200'>
              <tr>
                <th className='py-3 px-4 font-semibold text-sm'>Order ID</th>
                <th className='py-3 px-4 font-semibold text-sm'>Customer ID</th>
                <th className='py-3 px-4 font-semibold text-sm'>Order Date</th>
                <th className='py-3 px-4 font-semibold text-sm'>
                  Total Amount
                </th>
                <th className='py-3 px-4 font-semibold text-sm'>Status</th>
                <th className='py-3 px-4 font-semibold text-sm'>Details</th>
              </tr>
            </thead>
            <tbody className='text-green-900 text-sm'>
              {orders.map((order) => (
                <tr
                  key={order.OrderId}
                  className='hover:bg-green-100 transition duration-300 ease-in-out'>
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
      </motion.div>
      <Footer />
    </>
  );
};

export default Orders;
