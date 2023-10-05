import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../utils/axios";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    try {
      const response = await customFetch.get("/products/products");
      const data = response.data.products;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (url) => {
    try {
      const response = await customFetch.get(url);
      const data = response.data.product;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.products_loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products_loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.products_loading = false;
        state.products_error = true;
      })
      .addCase(getSingleProduct.pending, (state) => {
        state.single_product_loading = true;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        (state.single_product_loading = false),
          (state.single_product = action.payload);
      })
      .addCase(getSingleProduct.rejected, (state) => {
        (state.single_product_loading = false),
          (state.single_product_error = true);
      });
  },
});

export const { openSidebar, closeSidebar } = productsSlice.actions;

export default productsSlice.reducer;
