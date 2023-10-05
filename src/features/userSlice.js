import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import customFetch from "../utils/axios";

const getUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  isAuthenticated: false,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/users/signUp", user);
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const response = await customFetch.post("/users/login", user);
      const data = response.data;
      return { user: data.user, token: data.token };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async (token) => {
  try {
    const response = await customFetch.get("/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data;
    if (!data.success) {
      throw new Error(`${data.message} : ${data.error}`);
    }
    return {
      success: true,
      message: data.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
});

export const authUser = createAsyncThunk("user/authUser", async (token) => {
  try {
    const response = await customFetch.get("/users/auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        const user = payload;
        state.isLoading = false;
        state.user = user;
        toast.success(`Hello There ${user.name}`);
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.isLoading = false;
        state.user = payload.user;
        document.cookie = `token=${token}`;
        state.isAuthenticated = true;
        if (!localStorage.getItem("cartId")) {
          localStorage.setItem("cartId", payload.user.cart);
        }
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(`Welcome Back ${user.name}`);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = {};
        document.cookie = "token=; path=/; ";
      })
      .addCase(logoutUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, { payload }) => {
        const { token } = payload;
        state.isLoading = false;
        state.user = payload.user;
        document.cookie = `token=${token}; path=/; maxAge: 10800`;
        state.isAuthenticated = true;
      })
      .addCase(authUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        toast.error(payload);
      });
  },
});
export const { toggleTheme } = userSlice.actions;

export default userSlice.reducer;
