import React from 'react';
import { categories } from '../data';

const SideCategory = () => {
  return (
    <div className='h-full w-[350px] lg:w-auto lg:ml-10 overflow-hidden lg:mt-10'>
      <h1 className='text-xl text-green-900 font-thin'>Categories</h1>
      <hr className='mt-4 bg-green-900 h-[1.5px] w-40'></hr>
      <ul className='flex flex-row lg:flex-col items-start overflow-auto mt-3'>
        {categories.map((item) => (
          <li className='text-center group mr-10'>
            <a
              href='#'
              className='text-green-900 text-sm w-36 lg:w-60  my-1 rounded-3xl mx-1 text-start font-mono'
            >
              {item.title}
              <span class='block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-500'></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideCategory;
