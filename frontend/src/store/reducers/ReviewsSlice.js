// src/features/reviewSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../axios';

// Async thunk for fetching reviews
export const fetchReviews = createAsyncThunk(
  'reviews/fetchReviews',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/products/reviews/${productId}`);
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Initial state for reviews
const initialState = {
  reviews: [],
  status: null,
  error: null,
  loading: false,
};

const reviewSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchReviews actions
      .addCase(fetchReviews.pending, (state) => {
        state.status = 'pending';
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'success';
        state.reviews = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch reviews';
        state.loading = false;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;

export default reviewSlice.reducer;
