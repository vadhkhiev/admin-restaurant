import {combineReducers} from "redux";
import authReducer from "../modules/auth/core/reducer";
import roleReducer from "../modules/role/core/reducer";
import allusersReducer from "../modules/Usermanangement/core/reducer";
import currentUserReducer from "../modules/profile/core/reducer";
import foodReducer from "../modules/food/Core/slice";
import idReducer from "../modules/role/core/reducer";
import permissionReducer from "../modules/auth/core/reducer";
import foodCartReducer from "../modules/order/core/slice";
import orderReducer from "../modules/order/core/orderSlice";
import foodReportsReducer from "../modules/Report/core/reducer";
import categoriesReducer from "../modules/categories/core/slice";
export const rootReducers = combineReducers({
  auth: authReducer, // auth
  roles: roleReducer, // all roles
  users: allusersReducer, // all user
  currentUser: currentUserReducer, // current user
  foodList: foodReducer, //all food
  id: idReducer, // id of clicked staff title in role
  permission: permissionReducer, // permission
  foodCart: foodCartReducer, //  food order cart
  orders: orderReducer, //  Order list
  foodReports: foodReportsReducer,
  category: categoriesReducer,

  /* Add other reducers here  */
});
