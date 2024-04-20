import { createAsyncThunk } from '@reduxjs/toolkit';
import { userRequest } from '../../network/RequestMethod';
import { addOrUpdateProduct } from '../cartRedux';

export const addProductAsync = createAsyncThunk(
  'cart/addProductAsync',
  async (cartData, { rejectWithValue, dispatch }) => {
    const { userId } = cartData;
    console.log(cartData);
    try {
      if (userId) {
        const response = await userRequest.post('/cart', cartData);
        console.log(response);
        return response.data;
      } else {
        const existingItem = localStorage.getItem('cartData');
        let updatedCartData = cartData;

        if (existingItem) {
          const existingCartData = JSON.parse(existingItem);
          updatedCartData = {
            ...existingCartData,
            products: [...existingCartData.products],
          };

          if (cartData.products && Array.isArray(cartData.products)) {
            cartData.products.forEach((product) => {
              const existingProductIndex = updatedCartData.products.findIndex(
                (p) => p._id.toString() === product._id.toString()
              );

              if (existingProductIndex !== -1) {
                updatedCartData.products[existingProductIndex].quantity +=
                  product.quantity;
              } else {
                updatedCartData.products.push({
                  _id: product._id,
                  quantity: product.quantity,
                  price: product.price,
                });
              }
            });
          }

          updatedCartData.total = updatedCartData.products.reduce(
            (acc, product) => {
              return acc + product.price * product.quantity;
            },
            0
          );

          const uniqueProductIds = Array.from(
            new Set(updatedCartData.products.map((product) => product._id))
          );
          updatedCartData.items = uniqueProductIds.length;
        }

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
