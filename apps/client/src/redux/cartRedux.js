import { createSlice } from "@reduxjs/toolkit";
import { userRequest } from "../network/RequestMethod";

const savedCartData = localStorage.getItem("cartData");
const initialState = savedCartData
  ? JSON.parse(savedCartData)
  : {
      products: [],
      quantity: 0,
      total: 0,
    };

const cartSlice = createSlice({
  name: "cart",
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

      const accessToken = localStorage.getItem("accessToken");
      const userId = localStorage.getItem("id");

      const { products, total } = state;
      const cartData = { products, userId, total };

      if (accessToken && userId) {
        try {
          const response = userRequest.post("/", cartData);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      } else {
        localStorage.setItem("cartData", JSON.stringify(state));
      }
    },

    updateProductQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const productToUpdate = state.products.find((item) => item._id === _id);

      if (productToUpdate) {
        const diffInQuantity = quantity - productToUpdate.quantity;
        productToUpdate.quantity = quantity;
        state.total += diffInQuantity * productToUpdate.price;
        localStorage.setItem("cartData", JSON.stringify(state));
      }
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;

      localStorage.removeItem("cartData");
    },

    removeProduct: (state, action) => {
      const productId = action.payload;
      const index = state.products.findIndex((item) => item._id === productId);

      if (index !== -1) {
        const removedProduct = state.products[index];
        const removedQuantity = removedProduct.quantity;
        state.quantity -= 1;
        state.total -= removedProduct.price * removedQuantity;
        state.products.splice(index, 1);
        localStorage.setItem("cartData", JSON.stringify(state));
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addProductAsync.fulfilled, (state, action) => {
  //       // Update state with the fetched data
  //       const { products, userId, total } = action.payload;
  //       state.products = products;
  //       state.quantity = products.length;
  //       state.total = total;
  //       localStorage.setItem("cartData", JSON.stringify(state));
  //     })
  //     .addCase(addProductAsync.rejected, (state, action) => {
  //       // Handle the error
  //       console.log(action.payload);
  //     });
  // },
});

export const { addProduct, clearCart, updateProductQuantity, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
