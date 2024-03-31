import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../network/RequestMethod";

export const addProductAsync = createAsyncThunk(
  "cart/addProductAsync",
  async (cartData, { rejectWithValue }) => {
    const { userId } = cartData;
    try {
      if (userId) {
        const response = await userRequest.post("/cart", cartData);
        return response.data;
      } else {
        const existingItem = localStorage.getItem("cartData");
        let updatedCartData = cartData;

        if (existingItem) {
          const existingCartData = JSON.parse(existingItem);
          updatedCartData = {
            ...existingCartData,
            products: [...existingCartData.products],
          };

          cartData.products.forEach((product) => {
            const existingProductIndex = updatedCartData.products.findIndex(
              (p) => p._id.toString() === product._id.toString()
            );

            if (existingProductIndex !== -1) {
              // If the product exists, update the quantity
              updatedCartData.products[existingProductIndex].quantity +=
                product.quantity;
            } else {
              // If the product doesn't exist, add it to the products array
              updatedCartData.products.push({
                _id: product._id,
                quantity: product.quantity,
                price: product.price,
              });
            }
          });

          // Calculate and update the total price
          updatedCartData.total = updatedCartData.products.reduce(
            (acc, product) => {
              return acc + product.price * product.quantity;
            },
            0
          );

          // Calculate and update the items count
          const uniqueProductIds = Array.from(
            new Set(updatedCartData.products.map((product) => product._id))
          );
          updatedCartData.items = uniqueProductIds.length;
        }

        localStorage.setItem("cartData", JSON.stringify(updatedCartData));
        return updatedCartData;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
