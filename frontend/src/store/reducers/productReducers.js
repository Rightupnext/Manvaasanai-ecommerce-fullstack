import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { openModal } from "./modalSlice";
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(openModal({ type: "success", message: response.data?.message }));
      return response.data;
    } catch (error) {
      dispatch(openModal({ type: "error", message: "Failed to add product" }));
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/api/products");
      return response.data.products;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (title, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/api/products/${title}`);
      return response.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/products/${id}`);
      dispatch(openModal({ type: "success", message: response.data?.message }));
      return { id, message: response.data.message };
    } catch (error) {
      dispatch(openModal({ type: "error", message: "Failed to delete product" }));
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(openModal({ type: "success", message: "Product updated successfully" }));
      return response.data.product;
    } catch (error) {
      dispatch(openModal({ type: "error", message: "Failed to update product" }));
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/products/category/${categoryId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
export const addProductReviews = createAsyncThunk(
  "products/addProductReviews",
  async ({ productId, comment, rating }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/api/products/reviews`, {
        productId,
        comment,
        rating,
      });

      // Dispatch success modal
      thunkAPI.dispatch(
        openModal({
          type: "success",
          message: response.data?.message || "Review added successfully!",
        })
      );

      return response.data?.message; // Ensure message is returned properly
    } catch (error) {
      // Check for specific error from backend (400 Bad Request)
      const errorMessage = error.response?.data?.message;

      // Dispatch error modal for 'Already Reviewed'
      thunkAPI.dispatch(openModal({ type: "error", message: errorMessage }));

      return thunkAPI.rejectWithValue(errorMessage); // Send the error to the reducer
    }
  }
);

export const getProductsByIdReviews = createAsyncThunk(
  "products/getProductsByIdReviews",
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/api/products/reviews/${productId}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
// Initial state
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add product
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload.product);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get product by ID
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = state.products.filter(
          (product) => product._id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get products by category
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Set products from the API response
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add product reviews
      .addCase(addProductReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductReviews.fulfilled, (state, action) => {
        state.loading = false;
        // Update the product's reviews in the state if necessary
        if (state.product) {
          state.product.reviews.push(action.payload.review);
        }
      })
      .addCase(addProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get products by category
      .addCase(getProductsByIdReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsByIdReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Set products from the API response
      })
      .addCase(getProductsByIdReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default productSlice.reducer;
