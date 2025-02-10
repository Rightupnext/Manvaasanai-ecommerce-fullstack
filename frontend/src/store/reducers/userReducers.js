// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('api/auth/register', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('api/auth/login', loginData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Async thunk for fetching user orders
export const myOrders = createAsyncThunk(
  'auth/myOrders',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.get('api/auth/my-orders', {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
// Initial state
const initialState = {
  loginUser: { data: null, status: null, error: false },
  register: { data: null, status: null, error: false },
  myOrders: { data: null, status: null, error: false },
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.error = null;
      state.loginUser = { data: null, status: null, error: false };
      state.register = { data: null, status: null, error: false };
      localStorage.removeItem('token'); // Clear token on logout
      localStorage.removeItem('role');
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registration actions
      .addCase(registerUser.pending, (state) => {
        state.register.status = 'pending';
        state.register.error = false;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.register.status = 'success';
        state.register.data = action.payload;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.register.status = 'failed';
        state.register.error = true;
        state.register.data = action.payload || 'Registration failed';
        state.loading = false;
      })

      // Handle login actions
      .addCase(loginUser.pending, (state) => {
        state.loginUser.status = 'pending';
        state.loginUser.error = false;
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUser.status = 'success';
        state.loginUser.data = action.payload;
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUser.status = 'failed';
        state.loginUser.error = true;
        state.loginUser.data = action.payload || 'Login failed';
        state.loading = false;
      })

      // Handle My Orders
      .addCase(myOrders.pending, (state) => {
        state.myOrders.status = 'pending';
        state.myOrders.error = false;
        state.loading = true;
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.myOrders.status = 'success';
        state.myOrders.data = action.payload;
        state.loading = false;
      })
      .addCase(myOrders.rejected, (state, action) => {
        state.myOrders.status = 'failed';
        state.myOrders.error = true;
        state.myOrders.data = action.payload;
        state.loading = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
