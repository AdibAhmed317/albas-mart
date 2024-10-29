import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import { addProduct } from '../../redux/cartRedux';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { userRequest } from '../../network/RequestMethod';

const WishListCard = ({ product }) => {
  const quantity = 1;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const loggedInId = localStorage.getItem('id');

  const navigate = useNavigate();

  const handleCart = () => {
    setIsLoading(true);
    dispatch(addProduct({ ...product, quantity }));

    setTimeout(() => {
      setIsLoading(false);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Added to cart!',
        showConfirmButton: false,
        timer: 1500,
      });
    }, 500);
  };

  const handleDeleteWishList = async () => {
    if (loggedInId != null) {
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
        } else if (response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Product already exists in wishlist!',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to add to wishlist!',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to add to wishlist!',
        });
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='flex flex-col shadow-lg bg-green-100 rounded-lg max-w-[16rem]'>
      <Link to={`/product/${product._id}`}>
        <img
          className='object-cover rounded-t-lg h-[10rem] md:h-[12rem] w-full justify-center items-center'
          src={product.img}
          alt='product image'
        />
      </Link>
      <div className='px-3'>
        <h5 className='text-xl md:text-2xl font-normal text-green-900 mt-1'>
          {product.title}
        </h5>
        <p className='text-sm md:text-lg text-green-900 mt-0 mb-0 md:mt-2 md:mb-1'>
          {product.size}
        </p>
        <div className='flex flex-row justify-between md:items-center mb-1'>
          <h5 className='text-base md:text-2xl font-thin text-green-900'>
            ৳ {product.price}
          </h5>
          <div className='mt-1'>
            <button
              className='text-red-400 hover:text-red-600 mr-5 transition-all text-2xl'
              onClick={handleDeleteWishList}>
              <IoMdRemoveCircleOutline />
            </button>
          </div>
        </div>
        <button
          className='w-full p-2 bg-green-300 hover:bg-green-600 text-green-900 hover:text-white transition-all rounded-lg mb-3 font-thin'
          onClick={handleCart}
          disabled={isLoading}>
          {isLoading ? 'Adding to cart...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default WishListCard;
