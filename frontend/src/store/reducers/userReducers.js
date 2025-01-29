// src/features/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('api/auth/register', userData)
      return response.data // Return the response data to be used in the reducer
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  },
)

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('api/auth/login', loginData)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.role)
      return response.data // Return the response data (user data, token, etc.)
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message)
    }
  },
)

// Initial state with separate login and register states
const initialState = {
  loginUser: { data: null, status: null, error: false },
  register: { data: null, status: null, error: false },
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
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
