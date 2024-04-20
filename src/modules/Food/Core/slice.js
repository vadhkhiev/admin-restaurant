import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodList: [],
  toggleEdit: false,
  toggleView: false,
  toggleAdd: false,
  setID: null,
  food: null,
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
    storeToggleAdd: (state, action) => {
      state.toggleAdd = action.payload;
    },
    setFood: (state, action) => {
      state.food = action.payload;
    },
    storeID: (state, action) => {
      state.setID = action.payload;
    },
  },
});

export const {
  storeFood,
  setFood,
  storeToggleView,
  storeEditToggle,
  storeToggleAdd,
  storeID,
} = foodsSlice.actions;
export default foodsSlice.reducer;
