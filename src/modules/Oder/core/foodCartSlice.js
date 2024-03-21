import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    orderedFood: [],
};

const foodCartSlice = createSlice({
  name: 'orderedFood',
  initialState,
  reducers: {
    storeOrderedFood: (state, action) => {
      state.orderedFood = action.payload;
    },
  },
});

export const { storeOrderedFood } = foodCartSlice.actions;
export default foodCartSlice.reducer;
