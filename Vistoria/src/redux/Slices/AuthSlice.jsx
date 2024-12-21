import { createSlice } from '@reduxjs/toolkit';

// Initial state for authentication
const initialState = {
  user: null, // No user logged in by default
  isAuthenticated: false, // Track if the user is logged in
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to log in the user
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // Action to log out the user
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
