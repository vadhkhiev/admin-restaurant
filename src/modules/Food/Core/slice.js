import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodList: [],
  toggleEdit: false,
  toggleView: false,
  food: null
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
    storeToggleView: (state, action) => {
      state.toggleView = action.payload;
    },
    setFood: (state, action) => {
      state.food = action.payload;
    }
  },
});


export const { storeFood, setFood, storeToggleView, storeIdEdit, storeEditToggle } = foodsSlice.actions;
export default foodsSlice.reducer;
