import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  paging : {},
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    storeRoles: (state, action) => {
      state.roles = action.payload.data;
      state.paging = action.payload.paging;
    },
    removeRoles: (state) => {
      state.roles = [];
      state.paging = {};
    },
  },
});

export const { storeRoles ,removeRoles  } = roleSlice.actions;
export default roleSlice.reducer;
