import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../assets/data/categories';
import axios from 'axios';

const Sidebar = () => {
  const [fetchCat, setFetchCat] = useState([]);

  useEffect(() => {
    fetchAllCatagory();
  }, []);

  const fetchAllCatagory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/category');
      setFetchCat(res.data);
      console.log(fetchCat);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='h-full w-[350px] lg:w-auto overflow-hidden mt-0 md:mt-5'>
      <h1 className='text-2xl text-green-900 font-thin md:text-start lg:text-start mt-5 md:mt-0'>
        Categories
      </h1>
      <hr className='mt-4 bg-green-900 h-[1.5px] w-full'></hr>
      <ul className='flex flex-row lg:flex-col items-start overflow-auto text-center mt-3'>
        {fetchCat.map((item) => (
          <li className='mx-5 md:mx-0 group' key={item._id}>
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
