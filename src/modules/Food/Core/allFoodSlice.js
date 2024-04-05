import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodList: [],
  toggleEdit: false,
  idEdit: null,
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
    storeIdEdit: (state, action) => {
      state.idEdit = action.payload;
    },
  },
});

export const { storeFood } = foodsSlice.actions;
export const { storeEditToggle } = foodsSlice.actions;
export const { storeIdEdit } = foodsSlice.actions;
export default foodsSlice.reducer;
