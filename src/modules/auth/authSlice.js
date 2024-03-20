import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.data.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = [];
    }, 
  },
});

export const { login, logout  } = authSlice.actions;
export default authSlice.reducer;
