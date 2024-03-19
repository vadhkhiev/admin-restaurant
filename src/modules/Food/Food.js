import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./Component/FoodCard";
import { IoIosAddCircle } from "react-icons/io";
import AddForm from "./Component/AddForm";
import loadingmeme from "../../assets/img/loadingmeme.gif";
import EditFoodForm from "./Component/EditFoodForm";

function YourComponent() {
  const listFood = useSelector((state) => state.foodList.foodList);
  const [food, setFood] = useState([]);
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const [toggleForm, setToggleForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [toggleEdit, setToggleEdit] = useState(false);
  //allfood

  useEffect(() => {
    setFood(listFood);
    setRefresh(!refresh);
  }, [listFood]);

  useEffect(() => {
    if (food.length > 0) {
      setLoading(false);
    }
    setRefresh(!refresh);
  }, [food]);

  useEffect(() => {
    console.log("Food : " + food);
  }, []);

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
        {loading ? (
          <>
            <img src={loadingmeme} alt="" />
          </>
        ) : (
          <div className="row">
            {food.map((i) => {
              return (
                <div className="col-6 col-lg-3 col-md-4 col-sm-6" key={i.id}>
                  <FoodCard food={i} toggleEdit />
                </div>
              );
            })}
          </div>
        )}
        {/* <FoodCard food={food[0]} /> */}
      </main>
      <div>
        {toggleEdit && (
          <EditFoodForm toggle1={{ sendDataToParent: setToggleEdit }} />
        )}
      </div>
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
