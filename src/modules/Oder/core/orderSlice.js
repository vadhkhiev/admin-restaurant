import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  totals : 0
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    storeorder: (state, action) => {
      state.orders = action.payload;
    },
    storeTotalorder: (state, action) => {
      state.totals = action.payload
    }
  },
});

export const { storeorder , storeTotalorder } = orderSlice.actions;
export default orderSlice.reducer;
