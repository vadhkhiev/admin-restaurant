import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  total : 0
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    storeUsers: (state, action) => {
      state.users = action.payload;
    },
    storeTotalUsers: (state, action) => {
      state.total = action.payload
    }
  },
});

export const { storeUsers , storeTotalUsers } = usersSlice.actions;
export default usersSlice.reducer;
