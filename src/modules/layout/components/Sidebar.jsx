import React from "react";
import { Link, NavLink } from "react-router-dom";
import { sidebarlink  } from "../../../assets/constants/sidebarlink";
import { useDispatch} from "react-redux";
import { IoClose } from "react-icons/io5";

import { SlLogout } from "react-icons/sl";
import { logout } from "../../auth/core/reducer";
import  kiloImg  from "../../../assets/img/kiloit-logo.svg";
import PermissionChecker from "../../../assets/helper/PermissionChecker";

const Sidebar = ({ toggle }) => {
  const dispatch = useDispatch();
  return (
    <>
      <nav>
        <div className="sidebar-content js-simplebar">
          <div className="d-flex justify-content-between">
            <Link className="sidebar-brand align-items-center" to="/">
                <img width={60} src={kiloImg} alt="" />
              <span>KiloIT</span>
            </Link>
            <span className="d-xl-none fs-3 text-white-50 p-2" onClick={toggle}>
              <IoClose />
            </span>
          </div>
          <ul className="sidebar-nav">

            {sidebarlink.map((item) => (
              <>
             <PermissionChecker key={item.id} permission={item.permission}>
              {
                  item.category && (
                    <li className="m-3 text-white-50 fw-bolder" key="administrator-title">
                      {item.category}
                    </li>
                  )
                }
                <li className="sidebar-item" key={item.title}>
                  <NavLink to={item.link} className="sidebar-link">
                    <span className="fs-4">{item.icon}</span>
                    <span className="align-middle">{item.title}</span>
                  </NavLink>
                </li>
             </PermissionChecker>
              </>
            ))}

          </ul>
          <div
          style={{background: '#09090b'}}
            className="custom-btn cursor-pointer mt-3"
            onClick={() => {
              window.location.reload();
              dispatch(logout());
            }}
          >
            <button className="btn ">
              {" "}
              <SlLogout className="fs-4 fw-bold text-white" />{" "}
              <span className="ms-3 text-white">Log out</span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
