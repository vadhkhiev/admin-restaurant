import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: [],
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.data;
      state.isAuthenticated = true;
      state.token = action.payload.data.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    }, 
  },
});

export const { login, logout  } = authSlice.actions;
export default authSlice.reducer;
