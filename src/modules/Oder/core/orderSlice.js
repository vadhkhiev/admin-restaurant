import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  totals : 0,
  viewId : 0
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
    },
    storeViewId: (state, action) => {
      state.viewId = action.payload
    }
  },
});

export const { storeorder , storeTotalorder ,storeViewId } = orderSlice.actions;
export default orderSlice.reducer;
