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
    }
  }
});

export const { storeCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
