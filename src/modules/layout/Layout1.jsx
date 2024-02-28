import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import Topnav from './components/Topnav'
import Pathbtn from './components/Pathbtn'


const Layout1 = () => {
  const [close, setClose] = useState(false)
  const handleToggle = () =>{
    setClose(!close)
  }

  return (
    <>
  <div className="wrapper">
     <div>
     {!close && <Sidebar />}
     </div>
    <div className="main">
     <Topnav toggle={handleToggle} />
     <div >
      <Pathbtn/>
      <Outlet />
     </div>
    </div>
    </div>
  
    </>
  )
}

export default Layout1