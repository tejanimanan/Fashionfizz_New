import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

// Async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (userId) => {
    const response = await api.getOrders(userId);
    return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Order-specific reducers (e.g., place order, fetch orders)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Check if the payload contains an 'orders' key (common with json-server for filtered results)
        state.orders = action.payload.orders || action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { /* actions */ } = orderSlice.actions;
export default orderSlice.reducer;