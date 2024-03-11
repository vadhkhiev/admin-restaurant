import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {sidebarlink, administrator} from '../../../assets/data/sidebarlink';
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";

const Sidebar = ({toggle}) => {
    const currentuser = useSelector((state) => state.currentUser.currentUser.roleEntity?.name ?? state.currentUser.currentUser?.roleName)
  return (
    <>
		 <nav  >
            <div className="sidebar-content js-simplebar">
                <div className='d-flex justify-content-between'>
                <Link className="sidebar-brand align-items-center" to='/'>
                    <span >KiloIT</span>
                </Link>
                <span className="d-md-none fs-3 text-white-50 p-2" onClick={toggle}><IoClose /></span>
                </div>
                <ul className="sidebar-nav">
                {sidebarlink.map((item) => (
    <li className="sidebar-item" key={item.title}>
        <NavLink to={item.link} className="sidebar-link">
            <span className='fs-4'>{item.icon}</span>
            <span className="align-middle">{item.title}</span>
        </NavLink>
    </li>
))}
{currentuser && (currentuser === 'Super-Admin' || currentuser === 'Manager' ) && (
    <>
        <li className='m-3 text-white-50 ' key="administrator-title">Administrator</li>
        {administrator.map((item, index) => (
            <li className="sidebar-item" key={`administrator-${index}`}>
                <NavLink to={item.link} className="sidebar-link" >
                    <span className='fs-4'>{item.icon}</span>
                    <span className="align-middle">{item.title}</span>
                </NavLink>
            </li>
        ))}
    </>
)}  

            
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Sidebar