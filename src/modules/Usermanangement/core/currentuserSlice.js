import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {},
};

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    storeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = {};
    }
  }
});

export const { storeCurrentUser ,removeCurrentUser} = currentUserSlice.actions;

export default currentUserSlice.reducer;
