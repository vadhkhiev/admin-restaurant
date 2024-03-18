import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout1 from "./modules/layout/Layout1";

import Home from "./modules/home/Home";
import { useSelector } from "react-redux";
import Login from "./modules/Login/Login";
import User from "./modules/Usermanangement/User";
import Food from "./modules/Food/Food";
import Table from "./modules/table/Table";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user.user);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Home />} />
            <Route path="table" element={<Table />} />
            <Route path="category" element={<h1>Category</h1>} />
            <Route path="order" element={<h1>order</h1>} />
            <Route path="profile" element={<h1>Profile</h1>} />

            {/* admin routes */}
            {(user && user?.roleId === 1) || 2 ? (
              <>
                <Route path="users" element={<User />} />
                <Route path="role" element={<h1>Role</h1>} />
                <Route path="reports" element={<h1>Reports</h1>} />
                <Route path="foods" element={<Food />} />
              </>
            ) : null}

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
