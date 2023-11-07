import { createSlice } from '@reduxjs/toolkit';

const savedCartData = localStorage.getItem('cartData');
const initialState = savedCartData
  ? JSON.parse(savedCartData)
  : {
      products: [],
      quantity: 0,
      total: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item._id === newItem._id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.quantity += 1;
        state.products.push(action.payload);
      }
      state.total += action.payload.price * action.payload.quantity;

      localStorage.setItem('cartData', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;

      localStorage.removeItem('cartData');
    },
  },
});

export const { addProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
