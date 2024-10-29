import { createAsyncThunk } from '@reduxjs/toolkit';
import { addOrUpdateProduct } from '../cartRedux';
import { userRequest } from '../../network/RequestMethod';

export const addProductAsync = createAsyncThunk(
  'cart/addProductAsync',
  async (cartData, { rejectWithValue, dispatch }) => {
    try {
      const { userId, products } = cartData;
      let updatedCartData = { userId, products: [], total: 0, items: 0 };

      const existingItem = localStorage.getItem('cartData');

      if (existingCart) {
        const existingCartData = JSON.parse(existingItem);
        updatedCartData = {
          ...existingCartData,
          userId,
          products: existingCartData.products || [],
        };

        products.forEach((product) => {
          const existingProduct = updatedCartData.products.find(
            (p) => p._id === product._id
          );

          if (existingProduct) {
            existingProduct.quanity += product.quanity;
          } else {
            updatedCartData.products.push({ ...product });
          }
        });
      } else {
        updatedCartData.products = products;
      }

      updatedCartData.total = updatedCartData.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );
      updatedCartData.items = updatedCartData.products.length;

      if (userId) {
        const response = await userRequest.post('/cart', updatedCartData);
        return response.data;
      } else {
        localStorage.setItem('cartData', JSON.stringify(updatedCartData));
        dispatch(addOrUpdateProduct({ products: updatedCartData.products }));
        return updatedCartData;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
