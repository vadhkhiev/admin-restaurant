import React from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <>
        
        <div className="m-3 p-3 custom-border rounded-3">
            <Outlet />
        </div>
        
    </>
  )
}

export default Main