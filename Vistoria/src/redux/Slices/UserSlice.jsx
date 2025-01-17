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
      const { token, role, user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
      state.role = role;

      // Save to localStorage
      localStorage.setItem('Auth', token); // Save token
      localStorage.setItem('role',role); // Save role
      localStorage.setItem('user', JSON.stringify(user)); // Save user data
      localStorage.setItem('userId', user.id); // Save user ID
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
      localStorage.removeItem('userId'); // Clear user ID
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;