import React, { useState } from "react";
import OderList from "./components/OderList";
import { CiBoxList } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, Outlet } from "react-router-dom";


const MainOder = () => {
  const [selectedTab , setSelectedTab] = useState('') 
  return (
    <div>
        <div className='p-4 px-3 d-flex justify-content-between'>
            <span style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }} className='fw-bold p-2 rounded-3'>
              <Link style={{color:'#495057'}} to='/order' className={`me-3 cursor-pointer p-2 text-decoration-none ${selectedTab === '' ? 'borderbottom' : ''}`} onClick={() => setSelectedTab('')}>
                Order<TbTruckDelivery className='mb-1 ms-1'/>
                </Link>
              <Link style={{color:'#495057'}} to='/order/list' className={`p-2 cursor-pointer text-decoration-none ${selectedTab === 1 ? 'borderbottom' : ''}`} onClick={() => setSelectedTab(1)}>List<CiBoxList className='mb-1 ms-1' /></Link>
            </span>
          </div>
          <Outlet />

    </div>
  );
};

export default MainOder;
