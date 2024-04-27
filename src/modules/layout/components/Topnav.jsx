import React, { useEffect } from 'react'
import {  useSelector , useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import profileImg from '../../../assets/img/avatar.jpg'
import { logout } from '../../auth/core/reducer'
import { removeAuth } from '../../auth/authHelper'
import useCurrentUser from '../../profile/core/action'
const Topnav = ({toggle}) => {
    const profile = useSelector((state) => state.currentUser.currentUser);
    const dispatch = useDispatch();
    const {getCurrentUser} = useCurrentUser(); 
    useEffect(() => {
        getCurrentUser()
    },[])

  return (
    <>
         <nav style={{backgroundColor:'#090f0f',borderBottom:'1px solid rgba(252,253,255,0.2)' }} className="navbar navbar-expand rounded-3"  >
            <span onClick={toggle} className="sidebar-toggle js-sidebar-toggle">
                <i className="hamburger align-self-center"></i>
            </span>

            <div className="navbar-collapse collapse" >
                <ul style={{background:"#09090b"}} className="navbar-nav navbar-align">
                    <li className="nav-item d-flex align-items-center">
                       <span className='fs-4 fs-normal' style={{color:"#fcfdff"}}>{profile?.name}</span>
                    </li> 

                    <li className="nav-item dropdown d-flex align-items-center m-1 me-3 ">
                        <Link to='profile' className="nav-link  p-0"  data-bs-toggle="dropdown">
                        <div className='position-relative'>
                          <img height={30}  width={30} className='p-0 avatar border rounded-circle' src={profile?.avatar?.length < 50 ? profileImg : profile?.avatar} alt="" />
                        </div>
                    
                        </Link>
                        <div className="dropdown-menu dropdown-menu-end">
                            <Link className="dropdown-item" to='/profile'><i className="align-middle me-1" data-feather="user"></i> Profile</Link>
                            <Link to='/' className="dropdown-item" ><i className="align-middle me-1" data-feather="pie-chart"></i> Dashboard</Link>
                            <span className="dropdown-item text-danger border-top mt-3" href="#" onClick={() => {
                                removeAuth();
                                dispatch(logout());
                            }}>Log out</span>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </> 
  )
}

export default Topnav