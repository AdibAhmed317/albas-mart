import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { userRequest } from '@/network/RequestMethod';
import { addProductAsync } from '@/redux/thunks/cartThunk';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { IoMdRemoveCircleOutline } from 'react-icons/io';

const WishListCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInId = localStorage.getItem('id');

  const handleCart = () => {
    setIsLoading(true);
    dispatch(addProductAsync({ ...product, quantity: 1 })).finally(() =>
      setIsLoading(false)
    );

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleDeleteWishList = async () => {
    if (loggedInId) {
      try {
        const response = await userRequest.delete(
          `wishlist/${loggedInId}/${product._id}`
        );

        if (response.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Removed from wishlist!',
            showConfirmButton: false,
            timer: 1500,
          });
          location.reload();
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to remove from wishlist!',
        });
      }
    } else {
      navigate('/login');
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
            <p className='text-gray-500 font-robotoBlack'>{product.size}</p>
          </Link>
          <div className='flex justify-between items-center'>
            <span className='text-xl font-robotoLight text-cyan-600'>
              ৳ {product.price}
            </span>
            <button
              className='text-cyan-600 hover:text-primaryRed transition-colors duration-200'
              onClick={handleDeleteWishList}
            >
              <IoMdRemoveCircleOutline className='w-4 h-4' />
            </button>
          </div>
        </CardContent>

        <CardFooter className='p-4'>
          <Button
            className='w-full bg-cyan-600 text-white hover:bg-primaryBlue hover:text-black/50 transition-colors duration-200'
            size='lg'
            onClick={handleCart}
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add to Cart'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WishListCard;
