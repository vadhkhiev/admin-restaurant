import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import {sidebarlink, administrator} from '../../../assets/data/sidebarlink';
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const currentuser = useSelector((state) => state.currentUser.currentUser.roleEntity?.name ?? state.currentUser.currentUser?.roleName)
  return (
    <>
		 <nav  >
            <div className="sidebar-content js-simplebar">
                <Link className="sidebar-brand" to='/'>
                    <span className="align-middle">KiloIT</span>
                </Link>
                <ul className="sidebar-nav">
				
                {sidebarlink.map((item) => (
    <li className="sidebar-item" key={item.title}>
        <NavLink to={item.link} className="sidebar-link">
            <span className='fs-4'>{item.icon}</span>
            <span className="align-middle">{item.title}</span>
        </NavLink>
    </li>
))}
 {
    currentuser && (currentuser === 'Super-Admin' || currentuser?.roleId === 'Manager') && 
    <>
        <li className='m-3 text-white-50 ' key="administrator-title">administrator</li>
        {administrator.map((item, index) => (
            <li className="sidebar-item" key={`administrator-${index}`}>
                <NavLink to={item.link} className="sidebar-link" >
                    <span className='fs-4'>{item.icon}</span>
                    <span className="align-middle">{item.title}</span>
                </NavLink>
            </li>
        ))}
    </>
} 

            
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Sidebar