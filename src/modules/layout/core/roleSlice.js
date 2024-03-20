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
  },
});

export const { storeRoles  } = roleSlice.actions;
export default roleSlice.reducer;
