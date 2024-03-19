import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import Topnav from "./components/Topnav";
import Pathbtn from "./components/Pathbtn";
import getroles from "./core/getroles";
import { useDispatch, useSelector } from "react-redux";
import { storeRoles } from "./core/roleSlice";

//
import { storeFood, storeRefresh } from "../Food/Core/allFoodSlice";
import getAllFood from "../Food/Core/getAllFood";
import { storeCategories } from "../Food/Core/allCategoriesSlice";
import getFoodCategories from "../Food/Core/getFoodCategories";
const Layout1 = () => {
  const Refresh = useSelector((state) => state.foodList.refresh);
  const [open, setOpen] = useState(true);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchroles = async () => {
      try {
        const result = await getroles(token);
        dispatch(storeRoles(result.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchroles();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllFood(token, "/api/food");
        dispatch(storeFood(result.data));
      } catch (error) {
        console.error("Error in  component:", error);
      }
    };
    fetchData();
  }, []);
  //food categories
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const result = await getFoodCategories(token, "/api/category");
        dispatch(storeCategories(result.data));
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchFood();
  }, []);

  const toggle = () => {
    setOpen(!open);
  };


  return (
    <>
      <div className="wrapper">
        <div className={`sidebar ${open ? "" : "sidebar-hide"}`}>
          <Sidebar toggle={toggle} />
        </div>
        <div
          style={{
            background: "#eff0f1",
            boxShadow:
              "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
            border: "1px solid rgba(90, 125, 188, 0.1)",
          }}
          className={`main ${open ? "sidebar-show" : ""}`}
        >
          <Topnav toggle={toggle} />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout1;
