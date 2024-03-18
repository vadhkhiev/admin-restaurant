import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permission : [],
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    storePermission: (state, action) => {
      state.permission = action.payload
    },
  },
});

export const {  storePermission } = permissionSlice.actions;
export default permissionSlice.reducer;
