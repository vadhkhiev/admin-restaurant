import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom';
import { MdOutlineFastfood } from "react-icons/md";
import { MdOutlinePointOfSale } from "react-icons/md";
const Reports = () => {
    const location = useLocation();
  return (
    <div>
         <div className='mx-3 p-3 mb-0 px-0 d-flex justify-content-between'>
            <span className='fw-bold p-2 rounded-3 custom-border '>
              <Link  to='/reports' className={`me-3 text-white cursor-pointer p-2 text-decoration-none ${!location.pathname.includes('/reports/foods') ? 'borderbottom' : ''}`} >
                Sale<MdOutlinePointOfSale className='mb-1 ms-1'/>
                </Link>
              <Link  to='/reports/foods' className={`p-2 text-white cursor-pointer text-decoration-none ${location.pathname.includes('/reports/foods') ? 'borderbottom' : ''}`} >Food<MdOutlineFastfood className='mb-1 ms-1' /></Link>
            </span>
          </div>
          <div>
            <Outlet />
          </div>
    </div>
  )
}

export default Reports