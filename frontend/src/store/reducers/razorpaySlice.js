import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
  async (amount, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) throw new Error("Failed to create order");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// 🟢 Verify Payment Thunk
export const verifyPayment = createAsyncThunk(
  "razorpay/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:5000/api/razorpay/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment verification failed");

      return await response.json();
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
