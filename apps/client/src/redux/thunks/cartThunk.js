import { createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../network/RequestMethod';
import { addOrUpdateProduct } from '../cartRedux';

export const addProductAsync = createAsyncThunk(
  'cart/addProductAsync',
  async (cartData, { rejectWithValue, dispatch }) => {
    try {
      const { userId, products } = cartData;
      let updatedCartData = { userId, products: [], total: 0, items: 0 };

      // Check if there's existing cart data in localStorage
      const existingItem = localStorage.getItem('cartData');
      if (existingItem) {
        const existingCartData = JSON.parse(existingItem);
        updatedCartData = {
          ...existingCartData,
          userId,
          products: existingCartData.products || [],
        };

        // Update quantities or add new products
        products.forEach((product) => {
          const existingProduct = updatedCartData.products.find(
            (p) => p._id === product._id
          );
          if (existingProduct) {
            existingProduct.quantity += product.quantity;
          } else {
            updatedCartData.products.push({ ...product });
          }
        });
      } else {
        // If no existing cart data, just add the new products
        updatedCartData.products = products;
      }

      // Calculate total price and item count
      updatedCartData.total = updatedCartData.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      updatedCartData.items = updatedCartData.products.length;

      // If user is logged in, send cart data to server
      if (userId) {
        const response = await userRequest.post('/cart', updatedCartData);
        return response.data;
      } else {
        // If user is not logged in, save cart data to localStorage
        localStorage.setItem('cartData', JSON.stringify(updatedCartData));
        dispatch(addOrUpdateProduct({ products: updatedCartData.products }));
        return updatedCartData;
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { userRequest } from '../../network/RequestMethod';
// import { addOrUpdateProduct } from '../cartRedux';

// export const addProductAsync = createAsyncThunk(
//   'cart/addProductAsync',
//   async (cartData, { rejectWithValue, dispatch }) => {
//     const { userId } = cartData;
//     try {
//       const existingItem = localStorage.getItem('cartData');
//       let updatedCartData = { ...cartData };

//       if (existingItem) {
//         const existingCartData = JSON.parse(existingItem);
//         updatedCartData = {
//           ...existingCartData,
//           userId: cartData.userId,
//           products: [...existingCartData.products],
//         };

//         if (cartData.products && Array.isArray(cartData.products)) {
//           cartData.products.forEach((product) => {
//             const existingProductIndex = updatedCartData.products.findIndex(
//               (p) => p._id.toString() === product._id.toString()
//             );

//             if (existingProductIndex !== -1) {
//               updatedCartData.products[existingProductIndex].quantity +=
//                 product.quantity;
//             } else {
//               updatedCartData.products.push({
//                 _id: product._id,
//                 quantity: product.quantity,
//                 price: product.price,
//               });
//             }
//           });
//         }

//         updatedCartData.total = updatedCartData.products.reduce(
//           (acc, product) => {
//             return acc + product.price * product.quantity;
//           },
//           0
//         );

//         const uniqueProductIds = Array.from(
//           new Set(updatedCartData.products.map((product) => product._id))
//         );
//         updatedCartData.items = uniqueProductIds.length;
//       }

//       if (userId) {
//         console.log(updatedCartData);
//         const response = await userRequest.post('/cart', updatedCartData);
//         console.log(response);
//         return response.data;
//       } else {
//         localStorage.setItem('cartData', JSON.stringify(updatedCartData));
//         dispatch(addOrUpdateProduct({ products: updatedCartData.products }));
//         return updatedCartData;
//       }
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
