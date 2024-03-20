import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCategories: [],
};

const categorySlice = createSlice({
  name: "allCategory",
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      state.listCategories = action.payload; // Update listCategories instead of foodCategories
    },
  },
});

export const { storeCategories } = categorySlice.actions;
export default categorySlice.reducer;
