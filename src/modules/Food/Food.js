import React, { useEffect, useState } from "react";
import getFoodCategories from "./Core/getFoodCategories";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./Component/FoodCard";
import { IoIosAddCircle } from "react-icons/io";
import { storeFood } from "./Core/allFoodSlice";
import getAllFood from "./Core/getAllFood";
import AddForm from "./Component/AddForm";

function YourComponent() {
  const [listCategories, setListCategories] = useState([]);
  const food = useSelector((state) => state.foodList.foodList);
  const tokens = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token") || tokens;
  const dispatch = useDispatch();

  //allfood
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
      {console.log(food)}

      <main className="container">
        <div className="row">
          {food.map((i) => {
            return (
              <div className="col-6 col-lg-3 col-md-4 col-sm-6">
                <FoodCard food={i} />
              </div>
            );
          })}
        </div>
        {/* <FoodCard food={food[0]} /> */}
      </main>

      <footer></footer>
      <div className="position-absolute end-0 me-4">
        <button style={{ color: "#6c738f" }} className="border">
          <IoIosAddCircle style={{ fontSize: "3.2em" }} />
        </button>
      </div>
      <AddForm />
    </>
  );
}

export default YourComponent;
