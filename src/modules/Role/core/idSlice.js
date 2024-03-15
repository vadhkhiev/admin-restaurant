import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
};

const idSlice = createSlice({
  name: 'id',
  initialState,
  reducers: {
    storeId: (state, action) => {
      state.id = action.payload;
    },

  },
});

export const { storeId } = idSlice.actions;
export default idSlice.reducer;
