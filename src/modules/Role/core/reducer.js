import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  page : 1,

};

const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    storeId: (state, action) => {
      state.id = action.payload;
    },
    storePage: (state, action) => {
      state.page = action.payload;
    },

  },
});

export const { storeId  } = idSlice.actions;
export default idSlice.reducer;
