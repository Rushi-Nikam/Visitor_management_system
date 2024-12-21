import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  user:JSON.parse(localStorage.getItem('user')) || null ,// User data will be stored here
  isAuthenticated:!! localStorage.getItem('Auth'),
  role: localStorage.getItem('role') || null,  // Track if the user is authenticated
};

// Create slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data after login
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('Auth', action.payload.token); // Save token
      localStorage.setItem('role', action.payload.role); // Save role
      localStorage.setItem('user', JSON.stringify(action.payload.user)); 
    },
    // Action to clear user data on logout
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('Auth'); // Clear token
      localStorage.removeItem('role'); // Clear role
      localStorage.removeItem('user'); // Mark as not authenticated
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
