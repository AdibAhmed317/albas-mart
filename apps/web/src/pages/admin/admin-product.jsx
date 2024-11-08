import React, { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/sidebar/admin-sidebar';
import { useNavigate } from 'react-router-dom';
import { publicRequest, userRequest } from '../../network/request-method';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';
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
    <>
      <div className='flex min-h-screen flex-col md:flex-row'>
        <AdminSidebar />
        <div className='flex-1 p-6'>
          <div className='flex flex-col p-4 md:p-10'>
            <div className='w-full max-w-3xl mx-auto'>
              <Tabs defaultValue='createProduct'>
                <TabsList>
                  <TabsTrigger value='createProduct'>
                    Create Product
                  </TabsTrigger>
                  <TabsTrigger value='allProducts'>All Products</TabsTrigger>
                </TabsList>

                <TabsContent value='createProduct'>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <h1 className='text-2xl font-semibold text-black/80 mb-4'>
                      Create Product
                    </h1>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-gray-700 mb-2'>
                          Product Title
                        </label>
                        <input
                          type='text'
                          name='title'
                          value={productData.title}
                          onChange={handleInputChange}
                          className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                          required
                        />
                      </div>

                      <div>
                        <label className='block text-gray-700 mb-2'>
                          Product Description
                        </label>
                        <textarea
                          name='desc'
                          value={productData.desc}
                          onChange={handleInputChange}
                          className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                          required
                        />
                      </div>

                      <div>
                        <label className='block text-gray-700 mb-2'>
                          Category
                        </label>
                        <select
                          name='categories'
                          value={productData.categories}
                          onChange={handleInputChange}
                          className='w-full py-2 border rounded focus:outline-none focus:border-blue-500'
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
                        <label className='block text-gray-700 mb-2'>
                          Product Size (Kg, L, ml)
                        </label>
                        <input
                          type='text'
                          name='size'
                          value={productData.size}
                          onChange={handleInputChange}
                          className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                          required
                        />
                      </div>

                      <div>
                        <label className='block text-gray-700 mb-2'>
                          Price
                        </label>
                        <input
                          type='text'
                          name='price'
                          value={productData.price}
                          onChange={handleInputChange}
                          className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                          required
                        />
                      </div>

                      <div>
                        <label className='block text-gray-700 mb-2'>
                          Stock Quantity
                        </label>
                        <input
                          type='text'
                          name='StockQuantity'
                          value={productData.StockQuantity}
                          onChange={handleInputChange}
                          className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                          required
                        />
                      </div>

                      <div>
                        <label className='block text-gray-700 mb-2'>
                          Product Image
                        </label>
                        <input
                          type='file'
                          name='img'
                          id='file'
                          accept='image/png, image/jpeg'
                          onChange={(e) => setFile(e.target.files[0])}
                          className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                          required
                        />
                      </div>
                    </div>

                    <button
                      type='submit'
                      className='w-full bg-blue-400 text-white py-3 rounded-lg font-medium hover:bg-blue-500 transition duration-200'
                    >
                      Create Product
                    </button>

                    <div className='mt-10'>
                      <h2 className='text-2xl font-semibold text-black/80 mb-4'>
                        Add New Category
                      </h2>
                      <form onSubmit={handleCatSubmit} className='space-y-4'>
                        <div>
                          <label className='block text-gray-700 mb-2'>
                            Category Name
                          </label>
                          <input
                            type='text'
                            name='categoryName'
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                            required
                          />
                        </div>
                        <button
                          type='submit'
                          className='w-full bg-blue-400 text-white py-3 rounded-lg font-medium hover:bg-blue-500 transition duration-200'
                        >
                          Add Category
                        </button>
                      </form>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value='allProducts'>
                  <h1 className='text-2xl font-semibold text-black/80 mb-4'>
                    All Products
                  </h1>
                  {/* Display all products logic here */}
                  {/* Fetch and render products list */}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProduct;
