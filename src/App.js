import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout1 from './modules/layout/Layout1';
import { useState } from 'react';
import Home from './modules/home/Home';
import { useSelector } from 'react-redux';
import Login from './modules/Login/Login';


function App() {
  const { isAuthenticated } = useSelector(state => state.auth)	
  return (
    <>
      <Routes>
        {isAuthenticated ?
          <Route path="/" element={<Layout1/>}>
            <Route index element={<Home />} />
            <Route path="blog" element={<h1>Blog</h1>} />
            <Route path="category" element={<h1>Category</h1>} />
            <Route path="tag" element={<h1>tag</h1>} />
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="role" element={<h1>Role</h1>} />
            <Route path="reports" element={<h1>Reports</h1>} />
            <Route path="foods" element={<h1>Foods</h1>} />
            <Route path="profile" element={<h1>Profile</h1>} />

            {/* unknown path redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Route>
          :
          <>
            <Route index path="login" element={<Login/>} />
            <Route path="*" element={<Navigate to="login" />}></Route>
          </>
        }
      </Routes>
    </>

  );
}

export default App;
