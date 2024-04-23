import { createSlice } from "@reduxjs/toolkit";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${year}:${month}`;
}
const initialState = {
  saleReportList: [],
  loading : true,
  pagingdetails : {},
  params: {
    page: 1,
    size: 20,
    query: "",
    month: getCurrentDate(),
  },
};
const saleReportListSlice = createSlice({
  name: "saleReportList",
  initialState,
  reducers: {
    storeSaleReportList: (state, action) => {
      state.saleReportList = action.payload.data;
    },
    storePaging: (state, action) => {
      state.pagingdetails = action.payload;
    }, 
    storeParams : (state, action) => {
      return {...state, params: {...state.params, ...action.payload}};
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { storeSaleReportList, setLoading, storeParams, storePaging } = saleReportListSlice.actions;
export default saleReportListSlice.reducer;
