import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { publicRequest } from '../../network/RequestMethod';

const Sidebar = () => {
  const [fetchCat, setFetchCat] = useState([]);

  useEffect(() => {
    fetchAllCatagory();
  }, []);

  const fetchAllCatagory = async () => {
    try {
      const res = await publicRequest.get('category');
      setFetchCat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='overflow-hidden mt-0 md:mt-5'>
      <h1 className='text-2xl text-green-900 font-thin md:text-start mt-5 md:mt-0'>
        Categories
      </h1>
      <hr className='mt-4 bg-green-900 h-[1.5px] w-full'></hr>
      <ul className='flex flex-row lg:flex-col items-start overflow-auto md:text-start text-center mt-3'>
        {fetchCat.map((item) => (
          <li className='mx-5 xl:mx-0 group' key={item._id}>
            <Link
              to={`/shop/${item.CategoryName}`}
              className='text-green-900 text-base m-1 font-mono w-[4rem] md:w-auto'>
              {item.CategoryName}
              <span class='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-500'></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
