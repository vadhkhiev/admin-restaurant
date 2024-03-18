import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../auth/authSlice'
import { GoBell } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
const Topnav = ({toggle}) => {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.currentUser.currentUser)

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
                    <li className="nav-item d-flex align-items-center">
                       <span className='fs-4 fs-normal' style={{color:"#fcfdff"}}>{currentUser?.name}</span>
                    </li> 
                    <li className="nav-item dropdown">
                        <a className="nav-icon dropdown-toggle" href="#" id="messagesDropdown" data-bs-toggle="dropdown">
                            <div className="position-relative">
                                <i className="pb-3" data-feather="message-square"></i>
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

                    <li className="nav-item dropdown d-flex align-items-center m-1 me-3 ">
                        <Link to='profile' className="nav-link  p-0"  data-bs-toggle="dropdown">
                        <div className='position-relative'>
                          <img height={30}  width={30} className='p-0 avatar border rounded-circle' src={currentUser?.avatar} alt="" />
                        </div>
                    
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to='/profile'><i className="align-middle me-1" data-feather="user"></i> Profile</Link>
                            <Link to='/' className="dropdown-item" ><i className="align-middle me-1" data-feather="pie-chart"></i> Dashboard</Link>
                            <p className="dropdown-item text-danger border-top mt-3" onClick={() => handleLogout()} >Log out</p>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </> 
  )
}

export default Topnav