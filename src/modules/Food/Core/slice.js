import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    foodList: [],
    toggleEdit: false,
    paging:{},
    toggleView: false,
    toggleAdd: false,
    toggleUploadImage: false,
    selectedID: null,
    food: null,
    params : {
        size:12,
        page:1,
        query:''
    }
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
        storeSelectedID: (state, action) => {
            state.selectedID = action.payload;
        },
        storeToggleUploadImage: (state, action) => {
            state.toggleUploadImage = action.payload;
        },
        storeParams : (state, action) =>{
            state.params = { ...state.params,...action.payload};
        },
        storePaging: (state, action) => {
            state.paging = action.payload;
        }
    },
});

export const {
    storeFood,
    setFood,
    storeToggleView,
    storeEditToggle,
    storeToggleAdd,
    storeSelectedID,
    storeToggleUploadImage,
    storeParams ,
    storePaging
} = foodsSlice.actions;
export default foodsSlice.reducer;
