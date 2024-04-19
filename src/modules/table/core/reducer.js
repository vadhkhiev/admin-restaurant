import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tableList: [],
  updateData : null,
  updateToggle : false,
  createToggle : false,
  paging: {},
  loading: true,
  params : {
    page : 1,
    size : 20,
    query : '',
  }
};

const tableSlice = createSlice({
  name: "tableList",
  initialState,
  reducers: {
    storeTableList: (state, action) => {
      state.tableList = action.payload.data;
      state.paging = action.payload.paging;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    storeParams : (state , action) => {
      state.params = {...state.params, ...action.payload}
    },
    storeUpdate : (state , action) => {
      state.updateData = action.payload
    },
    storeUpdateToggle : (state , action) => {
      state.updateToggle = action.payload
    },
    storeCreateToggle : (state , action) => {
      state.createToggle = action.payload
    }
  },
});

export const { 
  storeTableList, 
  setLoading ,
   storeParams,
   storeUpdate,
   storeUpdateToggle ,
   storeCreateToggle
   } = tableSlice.actions;
export default tableSlice.reducer;
