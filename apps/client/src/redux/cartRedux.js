import { createSlice } from '@reduxjs/toolkit';
import { addProductAsync } from './thunks/cartThunk';

const savedCartData = localStorage.getItem('cartData');
const initialState = savedCartData
  ? JSON.parse(savedCartData)
  : {
      products: [],
      total: 0,
      items: 0,
    };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addOrUpdateProduct: (state, action) => {
      const { products } = action.payload;

      products.forEach((newProduct) => {
        const existingProductIndex = state.products.findIndex(
          (p) => p._id === newProduct._id
        );

        if (existingProductIndex !== -1) {
          state.products[existingProductIndex].quantity += newProduct.quantity;
        } else {
          state.products.push(newProduct);
        }
      });

      state.quantity = state.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      state.total = state.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      );

      const uniqueProductIds = new Set(
        state.products.map((product) => product._id)
      );
      state.items = uniqueProductIds.size;
    },

    updateProductQuantity: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );

      if (index !== -1) {
        state.products[index].quantity = updatedProduct.quantity;

        state.quantity = state.products.reduce(
          (acc, product) => acc + product.quantity,
          0
        );
        state.total = state.products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        );

        const uniqueProductIds = new Set(
          state.products.map((product) => product._id)
        );
        state.items = uniqueProductIds.size;

        localStorage.setItem('cartData', JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      localStorage.removeItem('cartData');
      return (state = initialState);
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
        state.items = state.items - 1;
        localStorage.setItem('cartData', JSON.stringify(state));
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const {
  addProduct,
  clearCart,
  updateProductQuantity,
  removeProduct,
  addOrUpdateProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
