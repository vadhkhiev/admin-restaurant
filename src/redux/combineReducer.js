import {combineReducers} from "redux";
import authReducer from "../modules/auth/authSlice";
export const rootReducers = combineReducers({
     auth: authReducer,
    /* Add other reducers here  */
})
