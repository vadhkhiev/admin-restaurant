import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodList: [],
  toggleEdit: false,
};

const foodsSlice = createSlice({
  name: "foodList",
  initialState,
  reducers: {
    storeFood: (state, action) => {
      state.foodList = action.payload;
    },
    storeEditToggle: (state, action) => {
      state.toggleEdit = action.payload;
    },
  },
});

export const { storeFood } = foodsSlice.actions;
export const { storeEditToggle } = foodsSlice.actions;
export default foodsSlice.reducer;
