import React, { useEffect, useState } from "react";
import getFoodCategories from "./Core/getFoodCategories";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./Component/FoodCard";
import { IoIosAddCircle } from "react-icons/io";
import { storeFood } from "./Core/allFoodSlice";
import getAllFood from "./Core/getAllFood";
import AddForm from "./Component/AddForm";
import { storeCategories } from "./Core/allCategoriesSlice";
import memeLoading from "../../assets/img/loadingmeme.gif";

function YourComponent() {
  const food = useSelector((state) => state.foodList.foodList);
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const tokens = useSelector((state) => state.auth.token);
  const token = localStorage.getItem("token") || tokens;
  const dispatch = useDispatch();

  const [toggleForm, setToggleForm] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {}, []);
  //food categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getFoodCategories(token, "/api/category");
        dispatch(storeCategories(result.data));
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchData();
    if (food) {
      setLoading(!loading);
    }
  }, []);

  if (loading) {
    return (
      <>
        <img className="w-100" src={memeLoading}></img>
      </>
    );
  }
  return (
    <div className="">
      <header>
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

      <main className="container position-relative">
        <div className="row">
          {food.map((i) => {
            return (
              <div className="col-6 col-lg-3 col-md-4 col-sm-6" key={i.id}>
                <FoodCard food={i} />
              </div>
            );
          })}
        </div>
        {/* <FoodCard food={food[0]} /> */}
      </main>

      <div>
        {toggleForm && <AddForm toggle={{ sendDataToParent: setToggleForm }} />}
      </div>

      <footer></footer>
      <div className="position-absolute end-0 me-2">
        <button
          style={{ color: "#6c738f" }}
          className="border"
          onClick={() => {
            setToggleForm(!toggleForm);
          }}
        >
          <IoIosAddCircle style={{ fontSize: "3.2em" }} />
        </button>
      </div>
    </div>
  );
}

export default YourComponent;
