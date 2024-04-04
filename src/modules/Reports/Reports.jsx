import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { MdOutlineFastfood } from "react-icons/md";
import { MdOutlinePointOfSale } from "react-icons/md";
const Reports = () => {
    const [selectedTab , setSelectedTab] = useState('')
  return (
    <div>
         <div className='p-4 px-3 d-flex justify-content-between'>
            <span style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }} className='fw-bold p-2 rounded-3'>
              <Link style={{color:'#495057'}} to='/reports' className={`me-3 cursor-pointer p-2 text-decoration-none ${selectedTab === '' ? 'borderbottom' : ''}`} onClick={() => setSelectedTab('')}>
                Sale<MdOutlinePointOfSale className='mb-1 ms-1'/>
                </Link>
              <Link style={{color:'#495057'}} to='/reports/foods' className={`p-2 cursor-pointer text-decoration-none ${selectedTab === 1 ? 'borderbottom' : ''}`} onClick={() => setSelectedTab(1)}>Food<MdOutlineFastfood className='mb-1 ms-1' /></Link>
            </span>
          </div>
          <div>
            <Outlet />
          </div>
    </div>
  )
}

export default Reports