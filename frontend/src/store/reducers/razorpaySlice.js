import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";

// Initial state
const initialState = {
  order: null,
  loading: false,
  error: null,
  paymentStatus: null,
};

// 🟢 Create Order Thunk
export const createOrder = createAsyncThunk(
  "razorpay/createOrder",
  async ({ amount, mobileNumber, name }, { rejectWithValue }) => { // Wrap parameters in an object
    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/phonepe/create-order`,
        { amount, mobileNumber, name }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🟢 Verify Payment Thunk
export const verifyPayment = createAsyncThunk(
  "razorpay/verifyPayment",
  async (orderId, { rejectWithValue }) => {
    try {
      // Axios request to verify payment
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/razorpay/verify-payment`,
        orderId
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🟢 Razorpay Slice
const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {}, // No extra reducers needed
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.paymentStatus = action.payload.status;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.paymentStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default razorpaySlice.reducer;
