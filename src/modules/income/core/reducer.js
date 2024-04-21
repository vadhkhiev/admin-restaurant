import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  saleReportList: [],
  loading: true,
  paging: {},
  params: {
    page: 1,
    size: 20,
    query: "",
  },
};
const saleReportListSlice = createSlice({
  name: "saleReportList",
  initialState,
  reducers: {
    storeSaleReportList: (state, action) => {
      state.saleReportList = action.payload.data;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
export const { storeSaleReportList, setLoading } = saleReportListSlice.actions;
export default saleReportListSlice.reducer;
