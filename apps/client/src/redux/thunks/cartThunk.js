import { createAsyncThunk } from "@reduxjs/toolkit";
import { userRequest } from "../../network/RequestMethod";

export const addProductAsync = createAsyncThunk(
  "cart/addProductAsync",
  async (cartData, { rejectWithValue }) => {
    const { accessToken, userId } = cartData;
    try {
      if (accessToken && userId) {
        const response = await userRequest.post("/cart", cartData);
        return response.data;
      } else {
        localStorage.setItem("cartData", JSON.stringify(cartData));
        return cartData;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);
