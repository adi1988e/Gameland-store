import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartSlice";
import productsReducer from "./features/productsSlice";
import filtersReducer from "./features/filtersSlice";
import userReducer from "./features/userSlice";
import uiReducer from "./features/ui-slice";

export const store = configureStore({
  reducer: {
    ui: uiReducer.reducer,
    user: userReducer,
    cart: cartReducer.reducer,
    products: productsReducer,
    filters: filtersReducer,
  },
});
