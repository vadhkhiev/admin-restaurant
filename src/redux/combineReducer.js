import {combineReducers} from "redux";
import authReducer from "../modules/auth/core/reducer";
import roleReducer from "../modules/role/core/reducer";
import allusersReducer from "../modules/Usermanangement/core/reducer";
import currentUserReducer from "../modules/profile/core/reducer";
import foodReducer from "../modules/Food/Core/slice";
import categoriesReducer from "../modules/Food/Core/allCategoriesSlice";
import idReducer from "../modules/role/core/reducer";
import permissionReducer from "../modules/auth/core/reducer";
import foodCartReducer from "../modules/order/core/slice";
import orderReducer from "../modules/order/core/orderSlice";
import foodReportsReducer from "../modules/Reports/core/reducer";
export const rootReducers = combineReducers({
    auth: authReducer, // auth
    roles: roleReducer, // all roles
    users: allusersReducer, // all user
    currentUser: currentUserReducer, // current user
    foodList: foodReducer, //all food
    allCategory: categoriesReducer, //all food categories
    id: idReducer, // id of clicked staff title in role
    permission: permissionReducer, // permission
    foodCart: foodCartReducer, //  food order cart
    orders: orderReducer, //  Order list
    foodReports : foodReportsReducer,

    /* Add other reducers here  */
});
