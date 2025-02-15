import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import {notification} from 'antd'
// Add Category
export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/categories",
        categoryData
      );

      notification.open({
        message: "Success", 
        description: response.data?.message || "Category added successfully",
        type: "success",
        duration: 3
      });

      return response.data;
    } catch (error) {
      notification.open({
        message: "Error",
        description: error.response?.data?.message || error.message || "An error occurred",
        type: "error",
        duration: 3
      });

      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, name }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/categories/${id}`, name);
      notification.open({
        type:"success",
        description:response.data?.message || `Category ${name} is updated`,
        duration:3
      })
      return response.data;
    } catch (error) {
      notification.open({
        type:"error",
        description:error.response?.data || error.message ||" category is error",
        duration:3
      })
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
// Delete Category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
     const response= await axiosInstance.delete(`/api/categories/${id}`);
      notification.open({
        type:"success",
        description:response.data?.message,
        duration:3
      })
      return id;
    } catch (error) {
      notification.open({
        type:"error",
        description:error.response?.data || error.message,
        duration:3
      })
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch All Categories
export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/categories");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: { categories: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          (cat) => cat._id === action.payload._id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
