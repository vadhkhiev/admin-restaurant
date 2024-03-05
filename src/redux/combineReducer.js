import {combineReducers} from "redux";
import authReducer from "../modules/auth/authSlice";
import roleReducer from "../modules/layout/core/roleSlice";
import usersReducer from "../modules/Usermanangement/core/usersSlice";
export const rootReducers = combineReducers({
     auth: authReducer,
     roles: roleReducer,
     users:usersReducer,
     
    /* Add other reducers here  */
})
