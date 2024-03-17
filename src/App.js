import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout1 from "./modules/layout/Layout1";
import Home from "./modules/home/Home";
import { useSelector } from "react-redux";
import Login from "./modules/Login/Login";
import User from "./modules/Usermanangement/User";
import Food from "./modules/Food/Food";
import Role from "./modules/Role/Role";
import Access from "./modules/Role/components/Access";
import MainOder from "./modules/Oder/core/MainOder";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  console.log(currentUser);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Home />} />
            <Route path="table" element={<h1>table</h1>} />
            <Route path="table/:id" element={<h1>table</h1>} />
            <Route path="category" element={<h1>Category</h1>} />
            <Route path="order" element={<MainOder />} />
            <Route path="profile" element={<h1>Profile</h1>} />
            <Route path="foods" element={<Food />} />
            <Route path="reports" element={<h1>Reports</h1>} />

            {/* admin routes */}
            {(currentUser && currentUser?.roleEntity?.id === 1) ||
            currentUser?.roleName === "Super-Admin" ? (
              <>
                <Route path="users" element={<User />} />
                <Route path="role" element={<Role />} />
                <Route path="role/access" element={<Access />} />
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
