import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    storeRoles: (state, action) => {
      state.roles = action.payload;
    },

  },
});

export const { storeRoles } = roleSlice.actions;
export default roleSlice.reducer;
