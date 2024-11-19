import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('token'), // Initialize based on localStorage
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null, // Store user data
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.user = user;
      localStorage.setItem('token', token); // Save token
      localStorage.setItem('user', JSON.stringify(user)); // Save user info
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('token'); // Clear token
      localStorage.removeItem('user'); // Clear user info
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
