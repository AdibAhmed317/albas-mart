import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import DropDown from '../../components/Navbar/DropDown';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import hero from '../../assets/hero.jpg';
import { useNavigate } from 'react-router-dom';
import { publicRequest, userRequest } from '../../network/RequestMethod';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import app from '../../firebase';

const CreateProduct = () => {
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
                <label className='mt-5 block text-gray-700'>
                  Product size (Kg, L, ml)
                </label>
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
                <label className='mt-5 block text-gray-700'>
                  Stock Quantity
                </label>
                <input
                  type='text'
                  name='StockQuantity'
                  value={productData.StockQuantity}
                  onChange={handleInputChange}
                  className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                  required
                />
                <label className='mt-5 block text-gray-700'>
                  Product Image
                </label>
                <input
                  type='file'
                  name='img'
                  id='file'
                  accept='image/png, image/jpeg'
                  onChange={(e) => setFile(e.target.files[0])}
                  className='w-auto md:w-[50%] px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
                  required
                />
              </div>
              <button className='p-3 bg-blue-400 rounded-lg font-thin'>
                Crate Product
              </button>
            </form>
            <div className='mt-8'>
              <h2 className='text-2xl font-normal text-green-900 mb-4'>
                Add New Category
              </h2>
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
