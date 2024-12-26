import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '@/components/admin/sidebar/admin-sidebar';
import { userRequest } from '@/network/request-method';
import { Search } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className='min-h-screen bg-gray-50'>
      <AdminSidebar />

      {/* Main content with mobile header spacing */}
      <div className='pt-16 sm:pt-0 sm:pl-64'>
        <div className='p-4 sm:p-6 lg:p-8 space-y-6'>
          {/* Header */}
          <div className='flex flex-col sm:flex-row justify-between gap-4'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>
                Online Orders
              </h1>
              <p className='text-gray-600 mt-1'>Manage and track all orders</p>
            </div>

            {/* Search Section */}
            <div className='w-full sm:w-72 relative flex items-center'>
              <div className='absolute left-3 text-gray-400'>
                <Search size={16} />
              </div>
              <Input
                type='text'
                placeholder='Search by Order ID...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-9'
              />
            </div>
          </div>

          {/* Orders Table */}
          <div className='bg-white rounded-lg shadow-sm'>
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className='font-medium'>{order._id}</TableCell>
                      <TableCell>{order.userId}</TableCell>
                      <TableCell>{formatDateString(order.createdAt)}</TableCell>
                      <TableCell>৳ {order.amount}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            order.status === 'succeeded'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className='text-right'>
                        <Link
                          to={`/admin/order-details/${order._id}`}
                          className='text-blue-600 hover:text-blue-800 font-medium'
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Empty State */}
              {filteredOrders.length === 0 && (
                <div className='text-center py-12'>
                  <p className='text-gray-500'>No orders found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
