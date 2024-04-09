import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  total: 0,
  paging: {},
  recent: [],
  params: {
    query: '',
    page: 1,
    size: 20,
    sort: '',
    order: 'desc',
    roleId: ''
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    storeUsers: (state, action) => {
      state.users = action.payload;
    },
    storeTotalUsers: (state, action) => {
      state.total = action.payload
    },
    storeRecentUsers: (state, action) => {
      state.recent = action.payload
    },
    storeParams: (state, action) => {
      state.params = {...state.params, ...action.payload}
    },
    storePaging: (state, action) => {
      state.paging = action.payload
    }
  },
});

export const { storeUsers, storeTotalUsers, storeRecentUsers ,storeParams , storePaging } = usersSlice.actions;
export default usersSlice.reducer;
