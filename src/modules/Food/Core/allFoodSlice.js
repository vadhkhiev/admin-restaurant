import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodList: [],
  refresh: true,
};

const foodsSlice = createSlice({
  name: "foodList",
  initialState,
  reducers: {
    storeFood: (state, action) => {
      state.foodList = action.payload;
    },
    storeRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },
});

export const { storeFood } = foodsSlice.actions;
export const { storeRefresh } = foodsSlice.actions;
export default foodsSlice.reducer;
