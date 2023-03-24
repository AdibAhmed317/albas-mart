import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CategoryItem = ({ item }) => {
  return (
    <div className='lg:mt-10 shadow-lg shadow-green-50'>
      <Card sx={{ maxWidth: 300 }} className='m-4 shadow-2xl'>
        <img
          className='h-40 w-fit lg:h-72 md:h-72 lg:w-96 md:w96 object-cover max-h-40'
          src={item.img}
        />
        <CardContent className='bg-gray-500 flex flex-col items-center justify-center'>
          <h1 className='text-white mb-2 text-3xl text-center font-thin'>
            {item.title}
          </h1>
          <Link
            to={`/product-list/${item.title}`}
            className='border-none p-2 mb-1 text-white cursor-pointer hover:bg-purple-700 bg-green-500 rounded-md font-thin text-xl'
          >
            Shop Now
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryItem;

// <div className='lg:mt-10 m-1 h-[70vh]' id='container'>
// <div className='w-[300px] h-full' id='info'>
//   <img
//     className='h-[400px] w-[500px] object-cover rounded-xl'
//     src={item.img}
//   />
//   <div className='h-[200px] w-[300px] bg-gray-600 opacity-80 flex flex-col items-center justify-center rounded-b-xl py-4 top-[200px]'>
//     <h1
//       className='text-white mb-5 text-3xl font-bold text-center'
//       id='title'
//     >
//       {item.title}
//     </h1>
//     <button className='border-none p-2 mb-4 text-white cursor-pointer hover:bg-purple-700 bg-green-500 rounded-md font-thin text-xl'>
//       Shop Now
//     </button>
//   </div>
// </div>
// </div>
