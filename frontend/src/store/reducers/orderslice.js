import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios";
import { openModal } from "./modalSlice";

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/order/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Async action to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/order/create-order", orderData);
      dispatch(openModal({ type: "success", message: response.data?.message }));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error placing order.";
      dispatch(openModal({ type: "error", message: errorMessage }));
      return rejectWithValue(errorMessage);
    }
  }
);

// Async action to update the order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/order/status-update/${orderId}/status`, { status });
      dispatch(openModal({ type: "success", message: response.data?.message }));
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error updating order status.";
      dispatch(openModal({ type: "error", message: errorMessage }));
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch total online transaction amount
export const fetchTotalOnlineTransaction = createAsyncThunk(
  "orders/fetchTotalOnlineTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`api/order/total-online-amount-trnsaction`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  orders: [],
  order: null,
  status: "idle",
  error: null,
  totalOnlineTransaction: { totalAmount: 0, transactions: [] },
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Place an order
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Update the order status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Fetch total online transactions
    builder
      .addCase(fetchTotalOnlineTransaction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTotalOnlineTransaction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalOnlineTransaction = action.payload;
      })
      .addCase(fetchTotalOnlineTransaction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
