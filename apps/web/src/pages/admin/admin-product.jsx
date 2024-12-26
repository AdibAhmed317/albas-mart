import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar/admin-sidebar';
import { useNavigate } from 'react-router-dom';
import { publicRequest, userRequest } from '@/network/request-method';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '@/firebase';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const AdminProduct = () => {
  const [categoryName, setCategoryName] = useState('');
  const [fetchCat, setFetchCat] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    title: '',
    desc: '',
    img: null,
    categories: '',
    size: [],
    price: null,
    StockQuantity: null,
  });

  useEffect(() => {
    fetchCatFunction();
  }, []);

  const fetchCatFunction = async () => {
    try {
      const response = await publicRequest.get('category/');
      setFetchCat(response.data);
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

    try {
      const filename = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, 'images/' + filename);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('File available at', downloadURL);
              setProductData((prevData) => ({
                ...prevData,
                img: downloadURL,
              }));

              const updatedProductData = {
                ...productData,
                img: downloadURL,
              };

              userRequest
                .post('products/create-product', updatedProductData)
                .then((res) => {
                  navigate('/admin/all-products/');
                  console.log(updatedProductData);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCatSubmit = async (e) => {
    e.preventDefault();

    const categoryData = { CategoryName: categoryName };
    try {
      const res = userRequest.post('category/', categoryData);
      setCategoryName('');
      fetchCatFunction();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <AdminSidebar />

      {/* Main content with mobile header spacing */}
      <div className='pt-16 sm:pt-0 sm:pl-64'>
        <div className='p-4 sm:p-6 lg:p-8'>
          {/* Page Header */}
          <div className='mb-6'>
            <h1 className='text-2xl font-bold text-gray-800'>
              Product Management
            </h1>
            <p className='text-gray-600 mt-1'>
              Create and manage your products
            </p>
          </div>

          {/* Main Content Card */}
          <div className='bg-white rounded-lg shadow-sm'>
            <Tabs defaultValue='createProduct' className='w-full'>
              <div className='border-b px-4 py-2'>
                <TabsList className='flex space-x-4'>
                  <TabsTrigger
                    value='createProduct'
                    className='px-4 py-2 text-sm font-medium'
                  >
                    Create Product
                  </TabsTrigger>
                  <TabsTrigger
                    value='allProducts'
                    className='px-4 py-2 text-sm font-medium'
                  >
                    All Products
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='createProduct' className='p-4 sm:p-6'>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Product Details Section */}
                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Product Title
                          </label>
                          <input
                            type='text'
                            name='title'
                            value={productData.title}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            required
                          />
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Category
                          </label>
                          <select
                            name='categories'
                            value={productData.categories}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          >
                            <option value=''>Select Category</option>
                            {fetchCat.map((item) => (
                              <option key={item._id} value={item.CategoryName}>
                                {item.CategoryName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Price
                          </label>
                          <input
                            type='number'
                            name='price'
                            value={productData.price}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            required
                          />
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Stock Quantity
                          </label>
                          <input
                            type='number'
                            name='StockQuantity'
                            value={productData.StockQuantity}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            required
                          />
                        </div>
                      </div>

                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Product Description
                          </label>
                          <textarea
                            name='desc'
                            value={productData.desc}
                            onChange={handleInputChange}
                            rows='4'
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            required
                          />
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Product Size (Kg, L, ml)
                          </label>
                          <input
                            type='text'
                            name='size'
                            value={productData.size}
                            onChange={handleInputChange}
                            className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            required
                          />
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-1'>
                            Product Image
                          </label>
                          <div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg'>
                            <div className='space-y-1 text-center'>
                              <svg
                                className='mx-auto h-12 w-12 text-gray-400'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 48 48'
                                aria-hidden='true'
                              >
                                <path
                                  d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                  strokeWidth={2}
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                />
                              </svg>
                              <div className='flex text-sm text-gray-600'>
                                <label
                                  htmlFor='file'
                                  className='relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500'
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id='file'
                                    name='img'
                                    type='file'
                                    className='sr-only'
                                    onChange={(e) => setFile(e.target.files[0])}
                                    required
                                  />
                                </label>
                                <p className='pl-1'>or drag and drop</p>
                              </div>
                              <p className='text-xs text-gray-500'>
                                PNG, JPG up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      type='submit'
                      className='w-full max-w-[20rem] bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
                    >
                      Create Product
                    </button>
                  </div>
                </form>

                {/* Category Section */}
                <div className='mt-8 pt-6 border-t'>
                  <h2 className='text-lg font-medium text-gray-900 mb-4'>
                    Add New Category
                  </h2>
                  <form onSubmit={handleCatSubmit} className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Category Name
                      </label>
                      <input
                        type='text'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className='w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        required
                      />
                    </div>
                    <button
                      type='submit'
                      className='w-full max-w-[20rem] justify-center items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors'
                    >
                      Add Category
                    </button>
                  </form>
                </div>
              </TabsContent>

              <TabsContent value='allProducts' className='p-4 sm:p-6'>
                <div className='space-y-4'>
                  <h2 className='text-lg font-medium text-gray-900'>
                    All Products
                  </h2>
                  {/* Add your products list here */}
                  <p className='text-gray-600'>No products found.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProduct;
