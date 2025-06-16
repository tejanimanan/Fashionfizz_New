import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
  },
  reducers: {
    // Add user-related reducers here (e.g., login, logout, register)
  },
  extraReducers: (builder) => {
    // Add extra reducers for async actions (e.g., user fetching)
  },
});

export const { /* actions */ } = userSlice.actions;
export default userSlice.reducer; 