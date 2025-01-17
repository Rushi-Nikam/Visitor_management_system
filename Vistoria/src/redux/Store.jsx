import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/UserSlice';

const persistedUser = localStorage.getItem('user') 
  ? JSON.parse(localStorage.getItem('user')) 
  : null;

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: persistedUser ? { ...persistedUser, isAuthenticated: true } : { isAuthenticated: false },
  },
});

export default store;
