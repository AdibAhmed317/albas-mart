import { createSlice } from '@reduxjs/toolkit';
import { addProductAsync } from './thunks/cartThunk';

const savedCartData = localStorage.getItem('cartData');
const initialState = savedCartData
  ? JSON.parse(savedCartData)
  : {
      products: [],
      quantity: 0,
      total: 0,
      items: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProducts = action.payload.products;
      state.products = newProducts;
      state.quantity = newProducts.reduce(
        (acc, product) => acc + product.quantity,
        0
      );
      state.total = newProducts.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      const uniqueProductIds = new Set(
        newProducts.map((product) => product._id)
      );
      state.items = uniqueProductIds.size;
    },

    updateProductQuantity: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );

      if (index !== -1) {
        const oldQuantity = state.products[index].quantity;
        state.products[index] = updatedProduct;
        state.quantity += updatedProduct.quantity - oldQuantity;
        state.total +=
          updatedProduct.price * updatedProduct.quantity -
          updatedProduct.price * oldQuantity;
        localStorage.setItem('cartData', JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.items = 0;

      localStorage.removeItem('cartData');
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      const index = state.products.findIndex((item) => item._id === productId);

      if (index !== -1) {
        const removedProduct = state.products[index];
        const removedQuantity = removedProduct.quantity;
        state.quantity -= removedQuantity;
        state.total -= removedProduct.price * removedQuantity;
        state.products.splice(index, 1);
        localStorage.setItem('cartData', JSON.stringify(state));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addProduct, clearCart, updateProductQuantity, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
