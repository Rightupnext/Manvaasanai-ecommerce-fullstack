import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { openModal } from "./modalSlice";

// Async thunk for creating shipping and tax details
export const createShippingAndTax = createAsyncThunk(
  "shippingAndTax/createShippingAndTax",
  async (shippingTaxData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post(
        "/api/shipping-tax/create",
        shippingTaxData
      );
      dispatch(openModal({ type: "success", message: response.data?.message }));
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      dispatch(openModal({ type: "error", message: errorMessage }));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for fetching shipping and tax details
export const getShippingAndTax = createAsyncThunk(
  "shippingAndTax/getShippingAndTax",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/shipping-tax/get");
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for updating shipping and tax details
export const updateShippingAndTax = createAsyncThunk(
  "shippingAndTax/updateShippingAndTax",
  async ({ id, shippingTaxData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/shipping-and-tax/${id}`,
        shippingTaxData
      );
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for deleting shipping and tax details
export const deleteShippingAndTax = createAsyncThunk(
  "shippingAndTax/deleteShippingAndTax",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/shipping-and-tax/${id}`);
      return response.data;
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      return rejectWithValue(errorMessage);
    }
  }
);

// Initial state for shipping and tax
const initialState = {
  shippingAndTax: [],
  status: "idle", // Can be 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const shippingAndTaxSlice = createSlice({
  name: "shippingAndTax",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle create shipping and tax actions
    builder
      .addCase(createShippingAndTax.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createShippingAndTax.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shippingAndTax.push(action.payload);
      })
      .addCase(createShippingAndTax.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle get shipping and tax actions
      .addCase(getShippingAndTax.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getShippingAndTax.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shippingAndTax = action.payload;
      })
      .addCase(getShippingAndTax.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle update shipping and tax actions
      .addCase(updateShippingAndTax.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateShippingAndTax.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.shippingAndTax.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.shippingAndTax[index] = action.payload;
        }
      })
      .addCase(updateShippingAndTax.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Handle delete shipping and tax actions
      .addCase(deleteShippingAndTax.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteShippingAndTax.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shippingAndTax = state.dshippingAndTaxata.filter(
          (item) => item._id !== action.payload._id
        );
      })
      .addCase(deleteShippingAndTax.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default shippingAndTaxSlice.reducer;
