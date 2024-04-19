import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading : true ,
  total: 0,
  editToggle: false,
  createToggle : false,
  paging: {},
  recent: [],
  params: {
    query: '',
    page: 1,
    size: 20,
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
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setEditToggle : (state , action) => {
      state.editToggle = action.payload
    },
    setCreateToggle : (state , action) => {
      state.createToggle = action.payload
    }
  },
});

export const { storeUsers, storeTotalUsers, storeRecentUsers,setCreateToggle ,storeParams , storePaging ,setLoading ,setEditToggle } = usersSlice.actions;
export default usersSlice.reducer;
