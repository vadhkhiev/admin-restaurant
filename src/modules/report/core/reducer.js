import { createSlice } from '@reduxjs/toolkit';
const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}:${month}`;
}

const initialState = {
  foodReports: {},
  pagingdetails : {},
  params : {
    month : getCurrentDate(),
  }
};

const foodReportsSlice = createSlice({
  name: 'foodReports',
  initialState,
  reducers: {
    storefoodReports: (state, action) => {
      state.foodReports = action.payload;
    },
    storePaging: (state, action) => {
      state.pagingdetails = action.payload;
    },
    storeParams : (state, action) => {
      return {...state, params: {...state.params, ...action.payload}};
    }
  }
});

export const { storefoodReports ,removefoodReports , storePaging ,storeParams} = foodReportsSlice.actions;

export default foodReportsSlice.reducer;
