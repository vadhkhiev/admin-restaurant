import React from 'react'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
const Layout1 = () => {
  return (
    <>
    <Sidebar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout1