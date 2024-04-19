import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roles: [],
  paging : {},
  createToggle : false,
  updateToggle : false , 
  id : null
  ,
  params : {
    page : 1,
    size : 20,
    query : '',
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
    },
    storeRolePermissions : (state, action) => {
      state.rolePermissions = action.payload.data.permissions
    },
    storeUpdateToggle : (state, action) => {
      state.updateToggle = action.payload
    },
    storeCreateToggle : (state, action) => {
      state.createToggle = action.payload
    }
  },
});

export const { 
  storeRoles ,
  removeRoles ,
  storeParams ,
  storeId ,
  storeRolePermissions ,
   storeUpdateToggle ,
   storeCreateToggle,
   } = roleSlice.actions;
export default roleSlice.reducer;
