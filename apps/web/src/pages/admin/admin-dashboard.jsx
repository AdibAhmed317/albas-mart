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
    <div className='flex min-h-screen'>
      <div className='w-64 bg-primaryBlue text-white'>
        <AdminSidebar />
      </div>
      <div className='flex-1 p-4 md:p-6 bg-slate-200'>
        <h1 className='text-center text-xl md:text-2xl font-bold mb-6 md:mb-8'>
          Admin Dashboard
        </h1>

        {/* Statistic Cards */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6'>
          <StatisticCard title='Total Users' value='1,250' />
          <StatisticCard title='Total Orders' value='650' />
          <StatisticCard title='Total Sales' value='$12,400' />
        </div>

        {/* Sales Chart */}
        <SalesChart data={lineData} />

        {/* Latest Users & Trending Products */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          <LatestUsers users={latestUsers} />
          <TrendingProductsChart data={barData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
