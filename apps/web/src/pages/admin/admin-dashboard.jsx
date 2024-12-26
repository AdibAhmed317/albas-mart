import React from 'react';
import AdminSidebar from '@/components/admin/sidebar/admin-sidebar.jsx';
import StatisticCard from '@/components/admin/dashboard/static-card';
import SalesChart from '@/components/admin/dashboard/sales-chart';
import TrendingProductsChart from '@/components/admin/dashboard/trending-products-chart';
import LatestUsers from '@/components/admin/dashboard/latest-users';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  // Chart data
  const lineData = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [150, 170, 140, 200, 220],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: ['Product A', 'Product B', 'Product C', 'Product D'],
    datasets: [
      {
        label: 'Trending Products',
        data: [25, 40, 55, 80],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
      },
    ],
  };

  const latestUsers = [
    { name: 'John Doe', email: 'john@example.com', joinedDate: '2023-05-01' },
    { name: 'Jane Smith', email: 'jane@example.com', joinedDate: '2023-04-15' },
    { name: 'Bob Johnson', email: 'bob@example.com', joinedDate: '2023-03-30' },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminSidebar />

      {/* Main content with mobile header spacing */}
      <div className='pt-16 sm:pt-0 sm:pl-64'>
        <div className='p-4 md:p-6 space-y-6'>
          {/* Header with welcome message */}
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
              Welcome Back, Admin
            </h1>
            <p className='text-gray-600 mt-1'>
              Here's what's happening with your store today.
            </p>
          </div>

          {/* Statistic Cards */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            <StatisticCard
              title='Total Users'
              value='1,250'
              className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
            />
            <StatisticCard
              title='Total Orders'
              value='650'
              className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
            />
            <StatisticCard
              title='Total Sales'
              value='$12,400'
              className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
            />
          </div>

          {/* Charts Section */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Sales Chart - Takes up 2 columns on large screens */}
            <div className='lg:col-span-2 bg-white rounded-lg p-4 shadow-sm'>
              <h2 className='text-lg font-semibold mb-4'>Sales Overview</h2>
              <div className='h-[300px] md:h-[400px]'>
                <SalesChart data={lineData} />
              </div>
            </div>

            {/* Trending Products - Takes up 1 column */}
            <div className='bg-white rounded-lg p-4 shadow-sm'>
              <h2 className='text-lg font-semibold mb-4'>Trending Products</h2>
              <div className='h-[300px] md:h-[400px]'>
                <TrendingProductsChart data={barData} />
              </div>
            </div>
          </div>

          {/* Latest Users Section */}
          <div className='bg-white rounded-lg p-4 shadow-sm'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-lg font-semibold'>Latest Users</h2>
              <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
                View All
              </button>
            </div>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Name
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Email
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Joined Date
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {latestUsers.map((user, index) => (
                    <tr key={index}>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>
                          {user.name}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>
                          {user.email}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-500'>
                          {new Date(user.joinedDate).toLocaleDateString()}
                        </div>
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

export default AdminDashboard;
