import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  paging : {},
  refetchvalue : false,
};

const roleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {
    storeRoles: (state, action) => {
      state.roles = action.payload.data;
      state.paging = action.payload.paging;
    },
    refetch: (state) => {
      return {
        ...state,
        refetchvalue: !state.refetchvalue,
      };
    },
    

  },
});

export const { storeRoles , refetch } = roleSlice.actions;
export default roleSlice.reducer;
