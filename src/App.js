import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout1 from "./modules/layout/Layout1";
import { useSelector } from "react-redux";
import Login from "./modules/Login/Login";
import User from "./modules/Usermanangement/User";
import Food from "./modules/Food/Food";
import Role from "./modules/Role/Role";
import Access from "./modules/Role/components/Access";
import Profile from "./modules/profile/Profile";
import Table from "./modules/table/Table";
import Dashboard from "./modules/Dashboard/Dashboard";
import MainOder from "./modules/Oder/MainOder";
import MakeOrder from "./modules/Oder/components/MakeOrder";
import ViewOrder from "./modules/Oder/components/ViewOrder";
import Reports from "./modules/Reports/Reports";
import FoodReports from "./modules/Reports/components/FoodReports";
import SaleReports from "./modules/Reports/components/SaleReports";
import OrderList from "./modules/Oder/components/OderList";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const permission = useSelector(
    (state) => state.permission?.permission?.data?.permissions
  );

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Dashboard/>} />
            <Route path="order" element={<MainOder />} >
              <Route index element={<MakeOrder />} />
              <Route path="list" element={<OrderList/>} />
              <Route path='view' element={<ViewOrder/>} />
            </Route>
            <Route path="table" element={<Table/>} />
            {/* <Route path="table/:id" element={<UpdateTable/>} /> */}
            <Route path="profile" element={<h1>Profile</h1>} />
            <Route path="foods" element={<Food />} />
            <Route path="reports" element={<Reports/>} >
              <Route index element={<SaleReports/>} />
              <Route path="foods" element={<FoodReports/>} />
            </Route>
            {/* administrator route */}
            {permission?.find((per) => per.name == "list-role")?.status ===
              1 && (
              <>
                <Route path="role" element={<Role />} />
                <Route path="role/access" element={<Access />} />
              </>
            )}
            {permission?.find((per) => per.name == "list-user")?.status ===
              1 && (
              <>
                <Route path="users" element={<User />} />
              </>
            )}
            {/*end of administrator route */}
            {/* unknown path redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Route>
        ) : (
          <>
            <Route index path="login" element={<Login />} />
            <Route path="*" element={<Navigate to="login" />}></Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
