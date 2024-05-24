import React from "react";
import { Link, NavLink } from "react-router-dom";
import { sidebarlink , report } from "../../../assets/data/sidebarlink";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { BsPersonGear } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";
import { logout } from "../../auth/core/reducer";
import  kiloImg  from "../../../assets/img/kiloit-logo.svg";

const Sidebar = ({ toggle }) => {
  const { userPermission } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
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
            <li className="m-3 text-white-50 fw-bolder" key="administrator-title">
              Home
            </li>
            {sidebarlink.map((item) => (
              <li className="sidebar-item" key={item.title}>
                <NavLink to={item.link} className="sidebar-link">
                  <span className="fs-4">{item.icon}</span>
                  <span className="align-middle">{item.title}</span>
                </NavLink>
              </li>
            ))}

            <li className="m-3 text-white-50 fw-bolder" key="administrator-title">
              Reports
            </li>
            {report.map((item) => (
              <li className="sidebar-item" key={item.title}>
                <NavLink to={item.link} className="sidebar-link">
                  <span className="fs-4">{item.icon}</span>
                  <span className="align-middle">{item.title}</span>
                </NavLink>
              </li>
            ))}

            {(user.id === 1 ||
              userPermission?.find((per) => per.name === "list-role")
                ?.status === 1 ||
              userPermission?.find((per) => per.name === "list-user")
                ?.status === 1) && (
              <li className="m-3 text-white-50 " key="administrator-title">
                Administrator
              </li>
            )}
            {(user.id === 1 ||
              userPermission?.find((per) => per.name === "list-user")
                ?.status === 1) && (
              <>
                <li className="sidebar-item">
                  <NavLink to="/users" className="sidebar-link">
                    <span className="fs-4">
                      <FaRegUserCircle />
                    </span>
                    <span className="align-middle">Users Management</span>
                  </NavLink>
                </li>
              </>
            )}

            {(user.id === 1 ||
              userPermission?.find((per) => per.name === "list-role")
                ?.status === 1) && (
              <>
                <li className="sidebar-item">
                  <NavLink to="/role" className="sidebar-link">
                    <span className="fs-4">
                      <BsPersonGear />
                    </span>
                    <span className="align-middle">Roles</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div
            className="custom-btn cursor-pointer"
            onClick={() => dispatch(logout())}
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
