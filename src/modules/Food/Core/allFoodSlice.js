import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  food: [],
};

const foodsSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
    storeFood: (state, action) => {
      state.food = action.payload;
    },
  },
});

export const { storeFood } = foodsSlice.actions;
export default foodsSlice.reducer;
