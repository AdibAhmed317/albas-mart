import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { userRequest } from '../../network/request-method';
import useAuth from '../../hooks/useAuth';
import { addProductAsync } from '../../redux/thunks/cartThunk';
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
    <div className='max-w-72 mx-auto p-4'>
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

// setIsLoading(true);
// dispatch(addProduct({ ...product, quantity }));

// setTimeout(() => {

//   });
// }, 500);

// <div className='flex flex-col shadow-lg bg-green-50 rounded-lg max-w-[13rem] border-black/5 border-2'>
//   <Link to={`/product/${product._id}`}>
//     <img
//       className='object-cover rounded-t-lg h-[10rem] md:h-[12rem] w-full justify-center items-center'
//       src={product.img}
//       alt='product image'
//     />
//   </Link>
//   <div className='px-3'>
//     <h5 className='text-lg md:text-xl font-normal text-green-900 mt-1'>
//       {product.title}
//     </h5>
//     <p className='text-sm text-green-900 mt-0 mb-0 md:mt-2 md:mb-1'>
//       {product.size}
//     </p>
//     <div className='flex flex-row justify-between md:items-center mb-1'>
//       <h5 className='text-base md:text-2xl font-thin text-green-900'>
//         ৳ {product.price}
//       </h5>
//       <div className='mt-1'>
//         <button
//           className='text-green-400 hover:text-green-600 mr-5 transition-all'
//           onClick={handleWishList}
//         >
//           <FaHeart />
//         </button>
//       </div>
//     </div>
//     <button
//       className='w-full p-2 bg-green-300 hover:bg-green-600 text-green-900 hover:text-white transition-all rounded-lg mb-3 font-thin'
//       onClick={handleCart}
//       disabled={isLoading}
//     >
//       {isLoading ? 'Adding to cart...' : 'Add to Cart'}
//     </button>
//   </div>
// </div>
// <Card className='w-full max-w-60 rounded-xl border width bg-primaryBlue'>
//   <div className='grid gap-4 p-4'>
//     <div className='aspect-[3/4] w-full overflow-hidden rounded-xl'>
//       <Link to={`/product/${product._id}`}>
//         <img
//           src={product.img}
//           alt='Product image'
//           className='aspect-[4/5] object-cover border w-full'
//         />
//       </Link>
//     </div>
//     <div className='grid gap-1.5'>
//       <h3 className='font-semibold text-sm md:text-base text-black/80'>
//         {product.title}
//       </h3>
//       <p className='font-semibold text-sm md:text-base text-black/80'>
//         ৳ {product.price}
//       </p>

//       <div className='mt-1 flex justify-between'>
//         <p className='text-sm md:text-base text-black/80'>{product.size}</p>
//         <button
//           className='text-primaryGreen hover:text-primaryRed mr-5 transition-all'
//           onClick={handleWishList}
//         >
//           <FaHeart />
//         </button>
//       </div>
//     </div>
//     <Button
//       size='sm'
//       className='hover:bg-primaryRed bg-primaryGreen'
//       onClick={handleCart}
//       disabled={isLoading}
//     >
//       {isLoading ? 'Adding to cart...' : 'Add to Cart'}
//     </Button>
//   </div>
// </Card>
