import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout1 from './modules/layout/Layout1';
import { useState } from 'react';
import Home from './modules/home/Home';


function App() {
  const [isAuthenticated, setisAuthenticated] = useState(true)
  return (
    <>
      <Routes>
        {isAuthenticated ?
          <Route path="/" element={<Layout1/>}>
            <Route index element={<Home />} />
            <Route path="product" element={<h1>checkout</h1>} />
            <Route path="*" element={<Navigate to="/" />}></Route>
          </Route>
          :
          <>
            <Route index path="login" element={<h1>Login</h1>} />
            <Route path="*" element={<Navigate to="login" />}></Route>
          </>
        }
      </Routes>
    </>

  );
}

export default App;
