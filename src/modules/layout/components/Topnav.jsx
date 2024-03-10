import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/authSlice'
import { GoBell } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
const Topnav = ({toggle}) => {
    const dispatch = useDispatch()

    const handleLogout = () =>{
      dispatch(logout())
      localStorage.removeItem('token')
    }
    
  return (
    <>
         <nav style={{background:'#6c738f '}} className="navbar navbar-expand ">
            <a onClick={toggle} className="sidebar-toggle js-sidebar-toggle">
                <i className="hamburger align-self-center"></i>
            </a>

            <div className="navbar-collapse collapse">
                <ul className="navbar-nav navbar-align">
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="#" id="alertsDropdown" data-bs-toggle="dropdown">
                            <div className="position-relative">
                                <GoBell className='text-white'/>
                                <span className="indicator">4</span>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
                            <div className="dropdown-menu-header">
                                4 New Notifications
                            </div>
                            <div className="list-group">
                                {/* Notifications items go here */}
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all notifications</a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
                            <div className="position-relative">
                                <i className="align-middle" data-feather="message-square"></i>
                            </div>
                        </a>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="messagesDropdown">
                            <div className="dropdown-menu-header">
                                <div className="position-relative">
                                    4 New Messages
                                </div>
                            </div>
                            <div className="list-group">
                                {/* Messages items go here */}
                            </div>
                            <div className="dropdown-menu-footer">
                                <a href="#" className="text-muted">Show all messages</a>
                            </div>
                        </div>
                    </li>
                    {/* <li>
                        <img width={35}  src={logo} alt="" />

                    </li> */}
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle " href="#" data-bs-toggle="dropdown">
                            <i className="align-middle" data-feather="settings"></i>
                        </a>
                        <Link to='profile' className="nav-link dropdown-toggle "  data-bs-toggle="dropdown">
                        <FaRegUserCircle className='text-white fs-3'/>
                    
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to='/profile'><i className="align-middle me-1" data-feather="user"></i> Profile</Link>
                            <p className="dropdown-item" ><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</p>
                            <div className="dropdown-divider"></div>
                            <p className="dropdown-item" href="index.html"><i className="align-middle me-1" data-feather="settings"></i> Settings & Privacy</p>
                            <p className="dropdown-item" ><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</p>
                            <div className="dropdown-divider"></div>
                            <p className="dropdown-item text-danger" onClick={() => handleLogout()} >Log out</p>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </> 
  )
}

export default Topnav