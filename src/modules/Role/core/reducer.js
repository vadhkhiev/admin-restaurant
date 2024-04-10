import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  paging : {},
  id : null
  ,
  params : {
    page : 1,
    size : 20,
  },
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
    storeParams: (state, action) => {
      state.params = {...state.params, ...action.payload};
    },
    storeId : (state, action) => {
      state.id = action.payload
    }
  },
});

export const { storeRoles ,removeRoles ,storeParams ,storeId  } = roleSlice.actions;
export default roleSlice.reducer;
