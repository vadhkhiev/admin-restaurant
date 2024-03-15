import { combineReducers } from "redux";
import authReducer from "../modules/auth/authSlice";
import roleReducer from "../modules/layout/core/roleSlice";
import allusersReducer from "../modules/Usermanangement/core/allusersSlice";
import currentUserReducer from "../modules/Usermanangement/core/currentuserSlice";
import foodReducer from "../modules/Food/Core/allFoodSlice";
import categoriesReducer from "../modules/Food/Core/allCategoriesSlice";
import idReducer from "../modules/Role/core/idSlice";

export const rootReducers = combineReducers({
  auth: authReducer, // auth
  roles: roleReducer, // all roles
  users: allusersReducer, // all user
  currentUser: currentUserReducer, // current user
  foodList: foodReducer, //all food
  allCategory: categoriesReducer, //all food categories
  id : idReducer,    // id of clicked staff title in role

  /* Add other reducers here  */
});
