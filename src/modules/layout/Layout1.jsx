import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Topnav from './components/Topnav'


const Layout1 = () => {
  const [close, setClose] = useState(false)
  const handleToggle = () =>{
    setClose(!close)
  }
  console.log(close)

  return (
    <>
  <div className="wrapper">
     {!close && <Sidebar />}
    <div className="main">
     <Topnav toggle={handleToggle} />
    <Outlet />
    </div>
    </div>
  
    </>
  )
}

export default Layout1