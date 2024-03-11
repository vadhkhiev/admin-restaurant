import { combineReducers } from "redux";
import authReducer from "../modules/auth/authSlice";
import roleReducer from "../modules/layout/core/roleSlice";
import allusersReducer from "../modules/Usermanangement/core/allusersSlice";
import currentUserReducer from "../modules/Usermanangement/core/currentuserSlice";
import foodReducer from "../modules/Food/Core/allFoodSlice";
export const rootReducers = combineReducers({
  auth: authReducer, // auth
  roles: roleReducer, // all roles
  users: allusersReducer, // all user
  currentUser: currentUserReducer, // current user
  allfood: foodReducer,

  /* Add other reducers here  */
});
