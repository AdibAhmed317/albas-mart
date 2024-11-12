import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';

const SalesChart = () => {
  const [selectedTab, setSelectedTab] = useState('daily'); // Default to 'daily' tab

  const dailyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Daily Sales',
        data: [30, 45, 40, 60, 50], // Example daily sales data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const monthlyData = {
    labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [150, 170, 140, 200, 220], // Example monthly sales data
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartData = selectedTab === 'daily' ? dailyData : monthlyData;

  return (
    <div className='bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6'>
      <h2 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
        Sales Overview
      </h2>

      {/* Stylish Tabs for switching */}
      <div className='flex mb-4'>
        <button
          className={`px-4 py-2 rounded-t-lg transition duration-300 ease-in-out ${
            selectedTab === 'daily'
              ? 'bg-blue-500 text-white font-robotoLight shadow-lg transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
          }`}
          onClick={() => setSelectedTab('daily')}
        >
          Daily Sales
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg transition duration-300 ease-in-out ${
            selectedTab === 'monthly'
              ? 'bg-blue-500 text-white font-robotoLight shadow-lg transform scale-105'
              : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
          }`}
          onClick={() => setSelectedTab('monthly')}
        >
          Monthly Sales
        </button>
      </div>

      <div className='h-64 md:h-80 mt-4'>
        <Line
          data={chartData}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
    </div>
  );
};

export default SalesChart;
