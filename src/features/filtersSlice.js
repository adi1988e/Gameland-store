import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  filtered_products: [],
  all_products: [],
  categories: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
  },
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async () => {
    const categories = [];
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_URL + "/categories/managers/all"
      );
      const data = response.data.categories;
      data.forEach((c) => {
        categories.push({ name: c.category_name, id: c._id });
      });
      return categories;
    } catch (error) {
      console.log(error);
    }
  }
);

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      let maxPrice = action.payload.map((p) => p.product_price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        filtered_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    },
    setGridView: (state) => {
      state.grid_view = true;
    },
    setListView: (state) => {
      state.grid_view = false;
    },
    updateSort: (state, action) => {
      return { ...state, sort: action.payload };
    },
    sortProducts: (state) => {
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.product_price - b.product_price;
        });
        return { ...state, filtered_products: tempProducts };
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.product_price - a.product_price;
        });
        return { ...state, filtered_products: tempProducts };
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.product_name.localeCompare(b.product_name);
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.product_name.localeCompare(a.product_name);
        });
      }
      return { ...state, filtered_products: tempProducts };
    },
    updateFilters: (state, action) => {
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    },

    filterProducts: (state) => {
      const { all_products } = state;
      const { text, category, company, price } = state.filters;
      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.product_name.toLowerCase().startsWith(text)
        );
        return { ...state, filtered_products: tempProducts };
      }
      if (category !== "all") {
        tempProducts = [...all_products];
        tempProducts = tempProducts.filter(
          (product) => product.categories[0].category_name === category
        );
        return { ...state, filtered_products: tempProducts };
      }
      if (company !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }
      // filter by price
      tempProducts = tempProducts.filter(
        (product) => product.product_price <= price
      );
      return { ...state, filtered_products: tempProducts };
    },

    clearFilters: (state) => {
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  setGridView,
  setListView,
  loadProducts,
  filterProducts,
  sortProducts,
  updateFilters,
  updateSort,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
