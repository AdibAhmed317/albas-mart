import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import hero from '../../assets/hero.jpg';

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    img: hero,
    categories: [],
    size: [],
    price: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    const categoriesArray = value.split(',').map((category) => category.trim());
    setProductData((prevData) => ({
      ...prevData,
      categories: categoriesArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
    try {
    } catch (error) {}
  };

  return (
    <>
      <>
        <Navbar />
        <DropDown />
        <div className='flex md:flex-row flex-col bg-green-50'>
          <AdminSidebar />
          <div className='container mx-auto px-4 py-8'>
            <form onSubmit={handleSubmit}>
              <h1 className='text-2xl font-normal text-green-900 mb-4'>
                Create product
              </h1>
              <div className='mb-4'>
                <label className='block text-gray-700'>Product Title</label>
                <input
                  type='text'
                  name='title'
                  value={productData.title}
                  onChange={handleInputChange}
                  className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                  required
                />
                <label className='mt-5 block text-gray-700'>
                  Product Description
                </label>
                <textarea
                  name='desc'
                  value={productData.desc}
                  onChange={handleInputChange}
                  className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                  required
                />
                <label className='mt-5 block text-gray-700'>
                  Product Category
                </label>
                <input
                  type='text'
                  name='categories'
                  value={productData.categories.join(', ')}
                  onChange={handleCategoryChange}
                  className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                  required
                />
                <label className='mt-5 block text-gray-700'>Product size</label>
                <input
                  type='text'
                  name='size'
                  value={productData.size}
                  onChange={handleInputChange}
                  className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                  required
                />
                <label className='mt-5 block text-gray-700'>
                  Product Price
                </label>
                <input
                  type='text'
                  name='price'
                  value={productData.price}
                  onChange={handleInputChange}
                  className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                  required
                />
              </div>
              <button className='p-3 bg-blue-400 rounded-lg font-thin'>
                Crate Product
              </button>
            </form>
          </div>
        </div>
      </>
    </>
  );
};

export default CreateProduct;
