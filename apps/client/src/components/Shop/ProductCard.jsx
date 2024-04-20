import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { userRequest } from '../../network/RequestMethod';
import useAuth from '../../hooks/useAuth';
import { addProductAsync } from '../../redux/thunks/cartThunk';

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
    // dispatch(addOrUpdateProduct({ products: cartData.products }));
    dispatch(addProductAsync(cartData));

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Added to cart!',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleWishList = async () => {
    if (userId != null) {
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
          text: 'Product already exist in wishlist!',
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
              className='text-green-400 hover:text-green-600 mr-5 transition-all'
              onClick={handleWishList}
            >
              <FaHeart />
            </button>
          </div>
        </div>
        <button
          className='w-full p-2 bg-green-300 hover:bg-green-600 text-green-900 hover:text-white transition-all rounded-lg mb-3 font-thin'
          onClick={handleCart}
          disabled={isLoading}
        >
          {isLoading ? 'Adding to cart...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

// setIsLoading(true);
// dispatch(addProduct({ ...product, quantity }));

// setTimeout(() => {

//   });
// }, 500);
