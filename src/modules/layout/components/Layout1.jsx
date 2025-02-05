import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Topnav from "./Topnav";


import useRoles from "../../Role/core/action";
const Layout1 = () => {
  const [open, setOpen] = useState(true);
  const {getRoles } = useRoles()
  useEffect(() => {
    getRoles()
  }, []);

  
  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="wrapper" style={{background:'#09090b'}}>
        <div className={`sidebar ${open ? "" : "sidebar-hide"}`}>
          <Sidebar toggle={toggle} />
        </div>
        <div
          style={{
            boxShadow:
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
          }}
          className={`main ${open ? "sidebar-show" : ""}`}
        >
          <Topnav toggle={toggle} />
          <div  >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout1;
