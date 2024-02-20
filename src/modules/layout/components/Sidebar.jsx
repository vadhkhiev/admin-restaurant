import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { Link, NavLink } from 'react-router-dom';
import {sidebarlink, administrator} from '../../../assets/data/sidebarlink';
const Sidebar = () => {

  return (
    <>
		 <nav id="sidebar" className="sidebar js-sidebar">
            <div className="sidebar-content js-simplebar">
                <Link className="sidebar-brand" to='/'>
                    <span className="align-middle">KiloIT</span>
                </Link>
                <ul className="sidebar-nav">
				
				{sidebarlink.map((item , index) => (
                <li className="sidebar-item" key={index}>
                    <NavLink to={item.link} className="sidebar-link" >
                        <span className='fs-4'>{item.icon}</span>
                        <span className="align-middle">{item.title}</span>
                    </NavLink>
                </li>
            ))}
			<li className="sidebar-header ">
                    Administrator
                </li>
				{
					administrator.map((item , index) => (
						<li className="sidebar-item" key={index}>
							<NavLink to={item.link} className="sidebar-link" >
								<span className='fs-4'>{item.icon}</span>
								<span className="align-middle">{item.title}</span>
							</NavLink>
						</li>
					))
				}
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Sidebar