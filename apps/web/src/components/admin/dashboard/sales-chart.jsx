import React from 'react';
import { Line } from 'react-chartjs-2';

const SalesChart = ({ data }) => (
  <div className='bg-white p-4 md:p-6 rounded-lg shadow-md mb-4 md:mb-6'>
    <h2 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
      Sales Overview
    </h2>
    <div className='h-64 md:h-80'>
      <Line
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </div>
);

export default SalesChart;
