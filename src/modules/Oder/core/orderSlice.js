import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  totals : 0,
  viewId : 0,
  clickedorder :[]
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
    },
    storeCLickedorder: (state, action) => {
      state.clickedorder = action.payload
    }
  },
});

export const { storeorder , storeTotalorder ,storeViewId , storeCLickedorder } = orderSlice.actions;
export default orderSlice.reducer;
