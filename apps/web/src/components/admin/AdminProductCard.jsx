import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';

const AdminProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const deleteProduct = async (productId) => {
    setIsLoading(true);
    // Assume deleteProductAsync is a function that handles product deletion
    try {
      await deleteProductAsync(productId);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Product deleted!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to delete product!',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full sm:w-[10rem] md:w-[15rem] lg:w-[20rem] max-w-full mx-auto p-4'>
      <Card className='shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105'>
        <CardHeader className='p-0'>
          <Link to={`/product/${product._id}`} className='block'>
            <img
              src={product.img}
              alt='Product Image'
              className='w-full h-64 object-cover transition-transform duration-300 hover:scale-110'
            />
          </Link>
        </CardHeader>

        <CardContent className='p-4'>
          <Link to={`/product/${product._id}`} className='block mb-1'>
            <h3 className='text-lg font-semibold text-gray-800 hover:text-primaryRed transition-colors duration-200'>
              {product.title}
            </h3>
            <p className='text-gray-600 mb-2 truncate'>{product.desc}</p>
            <p className='text-gray-500 font-robotoBlack'>{product.size}</p>
          </Link>
          <div className='flex justify-between items-center'>
            <span className='text-xl font-robotoLight text-cyan-600'>
              ৳ {product.price}
            </span>
            <button
              className='text-cyan-600 hover:text-primaryRed transition-colors duration-200'
              onClick={() => navigate(`/admin/product-details/${product._id}`)}
            >
              <FaHeart className='w-4 h-4' />
            </button>
          </div>
        </CardContent>

        <CardFooter className='p-4'>
          <Link
            to={`/admin/edit-product/${product._id}`}
            className='w-full bg-blue-500 text-white hover:bg-blue-600 rounded-lg mb-2 text-center p-2'
          >
            Edit
          </Link>
          <Button
            className='w-full bg-red-500 text-white hover:bg-red-600 transition-colors duration-200'
            onClick={() => deleteProduct(product._id)}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminProductCard;
