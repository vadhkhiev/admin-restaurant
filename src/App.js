import {Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import Layout1 from "./modules/layout/components/Layout1";
import { useSelector } from "react-redux";
import Login from "./modules/login/Login";
import User from "./modules/Usermanangement/components/User";
import Food from "./modules/Food/Component/Food";
import Role from "./modules/role/components/Role";
import Access from "./modules/role/components/Access";
import Profile from "./modules/profile/Profile";
import Table from "./modules/table/Table";
import Dashboard from "./modules/dashboard/components/Dashboard";
import MainOder from "./modules/order/components/MainOder";
import MakeOrder from "./modules/order/components/MakeOrder";
import ViewOrder from "./modules/order/components/ViewOrder";
import Reports from "./modules/Reports/components/Reports";
import FoodReports from "./modules/Reports/components/FoodReports";
import SaleReports from "./modules/Reports/components/SaleReports";
import OrderList from "./modules/order/components/OderList";


function App() {
    const {isAuth , user , userPermission} = useSelector((state) => state.auth);
    console.log(userPermission)

    return (
        <>
            <Routes>
                {isAuth ? 
                    <Route path="/" element={<Layout1/>}>
                        <Route index element={<Dashboard/>}/>
                        <Route path="order" element={<MainOder/>}>
                            <Route index element={<MakeOrder/>}/>
                            <Route path="list" element={<OrderList/>}/>
                            <Route path='view' element={<ViewOrder/>}/>
                        </Route>
                        <Route path="table" element={<Table/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="profile" element={<h1>Profile</h1>}/>
                        <Route path="foods" element={<Food/>}/>
                        <Route path="reports" element={<Reports/>}>
                            <Route index element={<SaleReports/>}/>
                            <Route path="foods" element={<FoodReports/>}/>
                        </Route>
                        {/* administrator route */}
                        {((userPermission?.find((per) => per.name == "list-role")?.status ===
                            1 || (user?.id === 1))) && (
                                <>
                                    <Route path="role" element={<Role/>}/>
                                    <Route path="role/access" element={<Access/>}/>
                                </>
                            )}
                        {(user?.id === 1 || (userPermission?.find((per) => per.name == "list-user")?.status ===
                            1)) ? (
                                <Route path="users" element={<User/>}/>
                        ) : null}
                            
                        {/*end of administrator route */}
                        {/* unknown path redirect to dashboard */}
                        <Route path="*" element={<Navigate to="/" />}></Route>
                    </Route>
                 : 
                    <>
                    <Route index path="login" element={<Login />} />
                    <Route path="*" element={<Navigate to="/login" />}></Route>
                    </>
                }
            </Routes>
        </>
    );
}

export default App;
