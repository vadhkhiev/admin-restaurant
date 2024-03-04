import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import Topnav from './components/Topnav'
import Pathbtn from './components/Pathbtn'
import getroles from './core/getroles'
import { useDispatch, useSelector } from 'react-redux'
import { storeRoles } from './core/roleSlice'

const Layout1 = () => {
  const [open, setOpen] = useState(true);
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const dispatch = useDispatch();

  useEffect(() => { 
    const fetchroles = async () => {
      try {
        const result = await getroles(token);
        dispatch(storeRoles(result.data))
        console.log(result.data)
      }
      catch (error) {
        console.error( error);
      }
    }
    fetchroles(); 
  },[])

  const toggle = () => {
    setOpen(!open);
  }

  return (
    <>
 <div className="wrapper">
  <div className={`sidebar ${open ? '' : 'sidebar-hide'}`}>
    <Sidebar />
  </div>
  <div className={`main ${open ? 'sidebar-show' : ''}`}>
    <Topnav toggle={toggle} />
    <div>
      <Pathbtn />
      <Outlet />
    </div>
  </div>
</div>
  
    </>
  )
}

export default Layout1