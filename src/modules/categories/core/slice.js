import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  toggleAction: false,
  toggleEditCategory: false,
  toggleAddCategory: false,
  toggleDeleteCategory: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    storeCategories: (state, action) => {
      state.categories = action.payload;
    },
    storeToggleAction: (state, action) => {
      state.toggleAction = action.payload;
    },
    storeToggleEditCategory: (state, action) => {
      state.toggleEditCategory = action.payload;
    },
    storeToggleAddCategory: (state, action) => {
      state.toggleAddCategory = action.payload;
    },
    storeDeleteCategory: (state, action) => [
      (state.toggleDeleteCategory = action.payload),
    ],
  },
});

export const { storeCategories, storeToggleAction } = categoriesSlice.actions;
export default categoriesSlice.reducer;
