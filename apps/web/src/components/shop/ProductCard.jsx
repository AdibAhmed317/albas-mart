import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { userRequest } from '@/network/RequestMethod.js';
import useAuth from '@/hooks/useAuth.js';
import { addProductAsync } from '@/redux/thunks/cartThunk.js';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();
  const cartData = {
    products: [
      {
        _id: product._id,
        quantity: 1,
        price: product.price,
      },
    ],
    userId: userId,
    items: cart.items + 1,
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCart = () => {
    setIsLoading(true);
    dispatch(addProductAsync(cartData)).finally(() => {
      setIsLoading(false);
    });

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleWishList = async () => {
    if (userId) {
      const wishlistData = {
        userId: userId,
        productId: product._id,
      };

      try {
        const response = await userRequest.post('wishlist/', wishlistData);

        if (response.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Added to wishlist!',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'info',
          title: 'Oops...',
          text: 'Product already exists in wishlist!',
        });
      }
    } else {
      navigate('/sign-in');
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
              onClick={handleWishList}
            >
              <FaHeart className='w-4 h-4' />
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

export default ProductCard;
