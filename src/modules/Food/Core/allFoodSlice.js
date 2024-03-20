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
  },
});

export const { storeFood } = foodsSlice.actions;
export default foodsSlice.reducer;
