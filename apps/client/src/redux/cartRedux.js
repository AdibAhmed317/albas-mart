import { createSlice } from "@reduxjs/toolkit";

const savedCartData = localStorage.getItem("cartData");
const initialState = savedCartData
  ? JSON.parse(savedCartData)
  : {
      products: [],
      quantity: 0,
      total: 0,
      items: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.items = 0;

      localStorage.removeItem("cartData");
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
        localStorage.setItem("cartData", JSON.stringify(state));
      }
    },
  },
});

export const { addProduct, clearCart, updateProductQuantity, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
