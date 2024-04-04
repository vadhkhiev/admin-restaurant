import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  permission : [],
  userRoleName : {}
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    storePermission: (state, action) => {
      state.permission = action.payload
    },
    storeUserRoleName : (state, action) => {
      state.userRoleName = action.payload
    },
    removePermission: (state) => {
      state.permission = []
    }
  },
});

export const {  storePermission , storeUserRoleName ,removePermission } = permissionSlice.actions;
export default permissionSlice.reducer;
