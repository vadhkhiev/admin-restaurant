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
    }
  },
});

export const {  storePermission , storeUserRoleName } = permissionSlice.actions;
export default permissionSlice.reducer;
