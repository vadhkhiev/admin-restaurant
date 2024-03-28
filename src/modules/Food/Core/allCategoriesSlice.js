import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCategories: [],
  toggleAction: false,
};

const categorySlice = createSlice({
  name: "allCategory",
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      state.listCategories = action.payload; // Update listCategories instead of foodCategories
    },
    storeToggleAction: (state, action) => {
      state.toggleAction = action.payload;
    },
  },
});

export const { storeCategories, storeToggleAction } = categorySlice.actions;
export default categorySlice.reducer;
