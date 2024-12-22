import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  isAuthenticated: !!localStorage.getItem('Auth'),
  role: localStorage.getItem('role') || null,  // Track if the user is authenticated
};

// Create slice for user authentication
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Action to set user data after login
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.role = action.payload.role;

      // Save to localStorage
      localStorage.setItem('Auth', action.payload.token); // Save token
      localStorage.setItem('role', action.payload.role); // Save role
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user data
    },
    
    // Action to clear user data on logout
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;
      
      // Clear localStorage
      localStorage.removeItem('Auth'); // Clear token
      localStorage.removeItem('role'); // Clear role
      localStorage.removeItem('user'); // Clear user data
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
