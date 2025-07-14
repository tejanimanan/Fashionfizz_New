import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../services/api';

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId) => {
    const response = await api.getCart(userId); // Assuming getCart in api.js can take userId
    return response;
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async ({ itemId, quantity, currentItem }) => {
    // The API might need the full item object or just ID and quantity
    const updatedItem = { ...currentItem, quantity };
    const response = await fetch(`http://localhost:5000/api/cart/${itemId}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    return data;
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId) => {
    await api.removeFromCart(itemId);
    return itemId;
  }
);

export const clearUserCart = createAsyncThunk(
  'cart/clearUserCart',
  async (userId, { getState }) => {
    const state = getState();
    const userCartItems = state.cart.items.filter(item => item.userId === userId);
    const deletePromises = userCartItems.map(item => 
      api.removeFromCart(item.id)
    );
    await Promise.all(deletePromises);
    return userId;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
   
    addToCartLocal: (state, action) => {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push(action.payload);
      }
    },
    updateQuantityLocal: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeFromCartLocal: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCartLocal: (state) => {
        state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
          console.error("Failed to update cart item quantity:", action.error);
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
          console.error("Failed to remove cart item:", action.error);
      })
      .addCase(clearUserCart.fulfilled, (state) => {
          state.items = [];
      })
      .addCase(clearUserCart.rejected, (state, action) => {
          console.error("Failed to clear user cart:", action.error);
      });
  },
});

export const { addToCartLocal, updateQuantityLocal, removeFromCartLocal, clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer; 