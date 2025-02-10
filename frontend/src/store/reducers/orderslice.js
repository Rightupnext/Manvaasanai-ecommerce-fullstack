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
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async action to place an order
export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData) => {
    const response = await axiosInstance.post("/api/place-order", orderData);
    return response.data;
  }
);

// Async action to update the order status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }, { dispatch }) => {
    try {
      const response = await axiosInstance.put(`/api/order/status-update/${orderId}/status`, {
        status,
      });
      
      // Dispatch the success modal
      dispatch(openModal({ type: "success", message: response.data?.message }));

      // Return the response data for successful API call
      return response.data;
    } catch (error) {
      // Handle the error properly
      const errorMessage = error.response ? error.response.data : error.message;
      dispatch(openModal({ type: "error", message: errorMessage }));
      
      // Returning an empty object or any value you wish to handle error gracefully
      return { error: errorMessage };
    }
  }
);


const initialState = {
  orders: [],
  order: null,
  status: "idle",
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
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
        state.error = action.error.message;
      });

    // Update the order status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedOrder = action.payload;
        const index = state.orders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (index >= 0) {
          state.orders[index] = updatedOrder;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
