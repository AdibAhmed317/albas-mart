import React from 'react';
import { Bar } from 'react-chartjs-2';

const TrendingProductsChart = ({ data }) => (
  <div className='bg-white p-4 md:p-6 rounded-lg shadow-md'>
    <h2 className='text-lg md:text-xl font-semibold mb-3 md:mb-4'>
      Trending Products
    </h2>
    <div className='h-64 md:h-80'>
      <Bar
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  </div>
);

export default TrendingProductsChart;
