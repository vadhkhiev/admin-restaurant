import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    tableList: [],
};

const tableSlice = createSlice({
    name: 'tableList',
    initialState,
    reducers: {
        storeTable: (state, action) => {
            state.tableList = action.payload;
        },
    },
});

export const { storeTable } = tableSlice.actions;
export default tableSlice.reducer