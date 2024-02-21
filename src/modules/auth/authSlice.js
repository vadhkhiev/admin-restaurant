import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    giveAuth: (state , action)=>{
      state.isAuthenticated = true;
    },
  },
});

export const { login, logout , giveAuth  } = authSlice.actions;
export default authSlice.reducer;
