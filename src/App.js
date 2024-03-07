import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout1 from "./modules/layout/Layout1";

import Home from "./modules/home/Home";
import { useSelector } from "react-redux";
import Login from "./modules/Login/Login";
import User from "./modules/Usermanangement/User";
import CreateUser from "./modules/Usermanangement/CreateUser";
import Food from "./modules/Food/Food";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user.user);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" element={<Layout1 />}>
            <Route index element={<Home />} />
            <Route path="blog" element={<h1>Blog</h1>} />
            <Route path="category" element={<h1>Category</h1>} />
            <Route path="tag" element={<h1>tag</h1>} />

            {/* admin routes */}
<<<<<<< HEAD
            {(user && user?.roleName === "Super-Admin") || "Manager" ? (
=======
            {user && user?.roleId === 1 || 2 ? (
>>>>>>> da68f9bde26223c906030b65488a9e51fd075aa0
              <>
                <Route path="users" element={<User />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="role" element={<h1>Role</h1>} />
                <Route path="reports" element={<h1>Reports</h1>} />
                <Route path="foods" element={<Food />} />
                <Route path="profile" element={<h1>Profile</h1>} />
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
