import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    storeUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { storeUsers } = usersSlice.actions;
export default usersSlice.reducer;
