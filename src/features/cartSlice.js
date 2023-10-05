import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import customFetch from "../utils/axios";

export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async (item, thunkAPI) => {
    const { cartId } = item;
    try {
      if (cartId === "") {
        const response = await customFetch.post(
          "/carts/add-item-to-cart",
          item
        );
        return response.data.data;
      } else {
        const response = await customFetch.put(`/carts/cart/${cartId}`, item);
        return response.data.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (userId, thunkAPI) => {
    try {
      const cartId = localStorage.getItem("cartId");
      const response = await customFetch.get(`/carts/cart/${cartId}`);
      if (!response.data.success) {
        throw new Error("Could not fetch cart data!");
      }
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, thunkAPI) => {
    try {
      const response = await customFetch.post(`/carts/clear-cart/${userId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (data, thunkAPI) => {
    try {
      const response = await customFetch.put("/carts/delete-item", data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const toggleCartItemAmount = createAsyncThunk(
  "cart/toggleCartItemAmount",
  async (data, thunkAPI) => {
    try {
      const response = await customFetch.put("/carts/toggle-item-amount", data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (item, thunkAPI) => {
    try {
      const response = await customFetch.post("/orders/createOrder", item);
      return response.data.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    cartId: "",
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addItemToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, { payload }) => {
        const { products, totalQuantity, cartId, totalAmount } = payload;
        state.items = products;
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
        state.cartId = cartId;
        localStorage.setItem("cartId", cartId);
        state.isLoading = false;
      })
      .addCase(addItemToCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.products;
        state.cartId = payload._id;
        state.totalQuantity = payload.totalQuantity;
        state.totalAmount = payload.totalAmount;
      })
      .addCase(getCartItems.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(removeItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeItem.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.products;
        state.totalQuantity = payload.totalQuantity;
        toast.success("Success to delete item");
      })
      .addCase(removeItem.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(toggleCartItemAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleCartItemAmount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.products;
        state.totalQuantity = payload.totalQuantity;
      })
      .addCase(toggleCartItemAmount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.items = payload.products;
        state.totalQuantity = payload.totalQuantity;
      })
      .addCase(clearCart.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
