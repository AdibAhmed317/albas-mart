import React, { useMemo } from 'react';
import { demoProduct } from '../components/Products/demoProduct';
import { Search } from '../assets/icons';
import { useLocation } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Sidebar from '../components/Products/Sidebar';
import ProductCard from '../components/Products/ProductCard';

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split('/')[2];
  console.log(cat);

  const getFilteredList = () => {
    if (!cat) {
      return demoProduct;
    }
    return demoProduct.filter((item) => item.cat === cat);
  };

  var filteredList = useMemo(getFilteredList, [cat, demoProduct]);

  return (
    <div className='bg-green-100 h-full'>
      <Navbar />
      {/* <div className='flex justify-start items-center mt-10 lg:mt-5 lg:-mb-10'>
        <input
          className='lg:w-[400px] w-60 h-10 rounded-3xl bg-green-200 pl-5 items-center'
          type='search'
          placeholder='Search'
        />
        <a href='#' className='bg-green-200 p-1 mx-2 rounded-full'>
          <Search />
        </a>
      </div> */}
      <div className='flex flex-col lg:flex-row justify-center items-center lg:items-start mt-10'>
        <div className='md:mr-5 lg:mr-5 mr-0'>
          <div className='flex justify-start items-center mt-0 lg:mt-5 ml-10'>
            <input
              className='lg:w-[200px] w-60 h-10 bg-green-200 pl-5 items-center'
              type='search'
              placeholder='Search'
            />
            <a href='/' className='p-1 mx-2'>
              <Search />
            </a>
          </div>
          <Sidebar />
        </div>
        <div className='grid md:grid-cols-4 grid-cols-2 overflow-auto scrollbar-hide h-[80vh] bg-green-50'>
          {filteredList.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;

// {
//   filteredList.map((product) => (
//     <div className='md:w-44 w-40 items-center flex flex-col shadow-2xl bg-white md:m-10 m-2'>
//       <Link to='/product' className='w-full'>
//         <img
//           className='h-[120px] lg:h-40 w-full object-cover'
//           src={product.image}
//           alt='product image'
//         />
//       </Link>
//       <hr className='mt-4 bg-green-500 h-[1.5px] w-40'></hr>
//       <div className='px-5 pb-5'>
//         <div className='mt-1'>
//           <h5 className='text-lg font-normal text-green-900'>{product.name}</h5>
//         </div>
//         <div className='flex items-center justify-between mt-3 text-white'>
//           <span className='text-lg font-medium text-green-900 mr-5 -ml-5'>
//             ${product.price}
//           </span>
//           <Link
//             className='relative text-green-800 hover:text-green-800 -mr-5'
//             to='/cart'
//           >
//             <ShoppingCart />
//           </Link>
//         </div>
//       </div>
//     </div>
//   ));
// }
