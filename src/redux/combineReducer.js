import {combineReducers} from "redux";
import authReducer from "../modules/auth/core/reducer";
import roleReducer from "../modules/Role/core/reducer";
import allusersReducer from "../modules/Usermanangement/core/reducer";
import currentUserReducer from "../modules/profile/core/reducer";
import foodReducer from "../modules/Food/Core/slice";
import idReducer from "../modules/Role/core/reducer";
import permissionReducer from "../modules/auth/core/reducer";
import ordersReducer from "../modules/order/core/reducer";
import foodReportsReducer from "../modules/Reports/core/reducer";
import categoriesReducer from "../modules/categories/core/slice";
import tableReducer from "../modules/table/core/reducer";
import saleReportReducer from "../modules/income/core/reducer";
export const rootReducers = combineReducers({
  auth: authReducer, // auth
  roles: roleReducer, // all roles
  users: allusersReducer, // all user
  currentUser: currentUserReducer, // current user
  foodList: foodReducer, //all food
  id: idReducer, // id of clicked staff title in role
  permission: permissionReducer, // permission
  orders: ordersReducer, 
  foodReports: foodReportsReducer,
  category: categoriesReducer,
  tableList : tableReducer,
  saleReportList : saleReportReducer
  /* Add other reducers here  */
});
