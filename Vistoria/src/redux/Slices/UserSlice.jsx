import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user: null, // User data will be stored here
  isAuthenticated: false, // Track if the user is authenticated
};

// Create slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data after login
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true; // Mark as authenticated
    },
    // Action to clear user data on logout
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false; // Mark as not authenticated
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
