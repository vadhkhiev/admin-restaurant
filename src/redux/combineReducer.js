import {combineReducers} from "redux";
import authReducer from "../modules/auth/authSlice";
import roleReducer from "../modules/layout/core/roleSlice";
export const rootReducers = combineReducers({
     auth: authReducer,
     roles: roleReducer,
     
    /* Add other reducers here  */
})
