import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderedFood: [],
  paging : {},
  orders : [],
  viewOrder : [],
  orderTableId : null,
  addFoodToggle : false,
  loading : true ,
  params : {
    page : 1,
    size : 20,
    query : '',
  }
};

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    storeOrderedFood: (state, action) => {
      const existingFood = state.orderedFood.findIndex(food => food.id === action.payload.id);

      if (existingFood !== -1) {
        state.orderedFood[existingFood].quantity++;
      } else {
        state.orderedFood.push({ ...action.payload, quantity: 1 , checked : false });
      }
    },
    quantity: (state, action) => {
      const existingFoodIndex = state.orderedFood.findIndex(food => food.id === action.payload.id);

      if (existingFoodIndex !== -1) {
        switch (action.payload.case) {
          case 'increment':
            state.orderedFood[existingFoodIndex].quantity++;
            break;
          case 'decrement':
            if (state.orderedFood[existingFoodIndex].quantity > 1) {
              state.orderedFood[existingFoodIndex].quantity--;
            }
            break;
          default:
            break;
        }
      }
    },
    tickedFood: (state, action) => {
      return {
        orderedFood: state.orderedFood.map(food => 
          food.id === action.payload ? { ...food, checked: !food.checked } : food
        )
      };
    },
    selection: (state, action) => {
      state.orderedFood.forEach(food => {
        switch (action.payload) {
          case 'tick':
            food.checked = true;
            break;
          case 'untick':
          default:
            food.checked = false;
            break;
        }
      });
    },
    deleteFood : (state) => {
      state.orderedFood = state.orderedFood.filter((food) => food.checked === false)
    },
    clearOrderedFood: (state) => {
      state.orderedFood = [];
    },
    storeParams : (state , action) => {
      state.params = {...state.params, ...action.payload}
    },
    storeOrders : (state , action) => {
      state.orders = action.payload.data
      state.paging = action.payload.paging
    },
    storeViewOrder : (state , action) => {
      state.viewOrder = action.payload
    },
    storeOrderTableId : (state , action) => {
      state.orderTableId = action.payload
    },
    storeAddFoodToggle : (state , action) => {
      state.addFoodToggle = action.payload
    },
    setLoading : (state , action) => {
      state.loading = action.payload
    }

  },
});

export const { storeOrderedFood ,storeViewOrder, clearOrderedFood , quantity ,tickedFood  ,selection ,deleteFood , storeOrderTableId , storeParams , storeOrders ,storeAddFoodToggle , setLoading  } = orders.actions;
export default orders.reducer;

