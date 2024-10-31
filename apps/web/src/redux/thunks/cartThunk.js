import { createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../network/request-method';
import { addOrUpdateProduct, clearCart } from '../cartRedux';

export const addProductAsync = createAsyncThunk(
  'cart/addProductAsync',
  async (cartData, { rejectWithValue, dispatch }) => {
    try {
      const { userId, products } = cartData;
      let updatedCartData = { userId, products: [], total: 0, items: 0 };

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

export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (userId, { rejectWithValue, dispatch }) => {
    console.log('cart called', userId);
    try {
      if (!userId) {
        const res = await userRequest.delete(`/cart/clear-cart/${userId}`);
        if (res.status === 200) {
          dispatch(clearCart());
        }
      } else {
        dispatch(clearCart());
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const updateProductQuantityAsync = createAsyncThunk(
//   'cart/upateProductAsync',
//   async (userId, product, { rejectWithValue, dispatch }) => {
//     try {
//       if (userId) {
//         const response = await userRequest.put('/cart/update', {
//           userId,
//           products: [product],
//         });
//         return response.data;
//       } else {
//         dispatch(updateProductQuantityLocal(product));
//       }
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
