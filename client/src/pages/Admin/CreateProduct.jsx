import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import hero from '../../assets/hero.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const [categoryName, setCategoryName] = useState('');
  const [fetchCat, setFetchCat] = useState([]);

  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    img: hero,
    categories: '',
    size: [],
    price: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCatFunction();
  }, []);

  const fetchCatFunction = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/category/');
      setFetchCat(response.data);
      console.log(fetchCat);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);
    const accessToken = localStorage.getItem('accessToken');
    const headers = { token: `Bearer ${accessToken}` };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/products/create-product',
        productData,
        { headers }
      );

      navigate('/admin/all-products/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCatSubmit = async (e) => {
    e.preventDefault();
    const categoryData = { CategoryName: categoryName };
    const accessToken = localStorage.getItem('accessToken');
    const headers = { token: `Bearer ${accessToken}` };
    try {
      const res = axios.post(
        'http://localhost:5000/api/category/',
        categoryData,
        { headers }
      );

      setCategoryName('');
      fetchCatFunction();
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
                <label className='block text-gray-700'>Category</label>
                <select
                  name='categories'
                  value={productData.categories}
                  onChange={handleInputChange}
                  className='w-auto md:w-[50%] py-2 border rounded focus:outline-none focus:border-blue-500'>
                  <option value=''>Select Category</option>
                  {fetchCat.map((item) => (
                    <option key={item._id} value={item.CategoryName}>
                      {item.CategoryName}
                    </option>
                  ))}
                </select>
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
            <div className='mt-8'>
              <h2 className='mb-4 text-2xl font-semibold'>Add New Category</h2>
              <form onSubmit={handleCatSubmit}>
                <div className='mb-4'>
                  <label className='block text-gray-700'>Category Name</label>
                  <input
                    type='text'
                    name='categoryName'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                    required
                  />
                </div>
                <button className='p-3 bg-blue-400 rounded-lg font-thin'>
                  Add Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default CreateProduct;
