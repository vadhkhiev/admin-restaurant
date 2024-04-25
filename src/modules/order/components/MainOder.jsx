import React from "react";
import { CiBoxList } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, Outlet, useLocation } from "react-router-dom";


const MainOder = () => {
  const location = useLocation();
  const path = location.pathname;

  
  return (
    <div>
        <div className='p-3 pb-0  d-flex justify-content-between'>
            <span style={{ boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px" }} className='fw-bold p-2 rounded-3 custom-border'>
              <Link  to='/order' className={`me-3 cursor-pointer p-2 text-decoration-none text-white ${path.includes('/list') ||  path.includes('/view') ? '' : 'borderbottom'}`} >
                Order<TbTruckDelivery className='mb-1 ms-1'/>
                </Link>
              <Link  to='/order/list' className={`p-2 cursor-pointer text-decoration-none text-white ${path.includes('/list') || path.includes('/view') ? 'borderbottom' : ''}`} >List<CiBoxList className='mb-1 ms-1' /></Link>
            </span>
          </div>
          <Outlet />

    </div>
  );
};

export default MainOder;
