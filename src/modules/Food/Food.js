import React, { useEffect, useState } from "react";
import getFoodCategories from "./Core/getFoodCategories";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./Component/FoodCard";
import { IoIosAddCircle } from "react-icons/io";
import { storeFood } from "./Core/allFoodSlice";
import getAllFood from "./Core/getAllFood";

function YourComponent() {
  const [listCategories, setListCategories] = useState([]);
  const food = useSelector((state) => {});
  const tokens = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token") || tokens;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllFood(token, "/api/food");
        console.log(result.data);
      } catch (error) {
        console.error("Error in  component:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFoodCategories(token);
        setListCategories(result.data);
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="position-relative">
        <div
          className=" p-2 text-center text-white m-2 rounded-3 fw-bold"
          style={{ background: "#6c738f" }}
        >
          Food List
        </div>
        <nav className="d-flex col justify-content-between m-2">
          {listCategories.map(({ name, id }) => {
            return (
              <button
                key={id}
                style={{ background: "#6b728e" }}
                className="text-center col-2 border rounded-3"
              >
                <h5 className="text-white">{name}</h5>
              </button>
            );
          })}
        </nav>
      </header>

      <main className="container">
        <div className="row">
          <div className="col-6 col-lg-3 col-md-4 col-sm-6 ">
            <FoodCard />
          </div>
          <div className="col-6 col-lg-3 col-md-4 col-sm-6">
            <FoodCard />
          </div>
          <div className="col-6 col-lg-3 col-md-4 col-sm-6">
            <FoodCard />
          </div>
          <div className="col-6 col-lg-3 col-md-4 col-sm-6">
            <FoodCard />
          </div>
          <div className="col-6 col-lg-3 col-md-4 col-sm-6">
            <FoodCard />
          </div>
          <div className="col-6 col-lg-3  col-md-4 col-sm-6">
            <FoodCard />
          </div>
          <div className="col-6 col-lg-3 col-md-4 col-sm-6">
            <FoodCard />
          </div>
        </div>
      </main>

      <footer></footer>
      <div className="position-absolute end-0 me-4">
        <IoIosAddCircle style={{ fontSize: "3.2em" }} />
      </div>
    </>
  );
}

export default YourComponent;
