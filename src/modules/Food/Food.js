import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./Component/FoodCard";
import { IoIosAddCircle } from "react-icons/io";
import AddForm from "./Component/AddForm";
import EditFoodForm from "./Component/EditFoodForm";
import LoadingFoodCard from "./Component/LoadingFoodCard";
import ActionCategories from "./Component/ActionCategories";
import { storeToggleAction } from "./Core/allCategoriesSlice";

function YourComponent({}) {
  const listFood = useSelector((state) => state.foodList.foodList);
  const [food, setFood] = useState([]);
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );

  const [selectedCategories, setSelectedCategories] = useState("");
  const [toggleForm, setToggleForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const toggleEdit = useSelector((state) => state.foodList.toggleEdit);
  const toggleAction = useSelector((state) => state.allCategory.toggleAction);
  const dispatch = useDispatch();

  //! if delete this, it not gonna work, i have no idea why
  useEffect(() => {
    setFood(listFood);
  }, [listFood]);

  useEffect(() => {
    if (selectedCategories === "") {
      setFood(listFood);
      return;
    }
    const filterBaseOnCategories = listFood.filter((i) => {
      return selectedCategories === i.foodCategoryEntity.name;
    });
    setFood(filterBaseOnCategories);
  }, [selectedCategories]);

  useEffect(() => {
    if (food.length > 0) {
      setLoading(false);
    }
  }, [food]);

  return (
    <div className="">
      <header>
        <div
          className=" p-2 text-center text-white m-2 rounded-3 fw-bold"
          style={{ background: "#6c738f" }}
        >
          Food List
          <span>
            <button
              className="border text-align-center text-white position-absolute end-0 me-4 mt-6 rounded-3"
              style={{ background: "#6c738f" }}
              onClick={() => {
                dispatch(storeToggleAction(!toggleAction));
              }}
            >
              <p className="p-0 m-0">Actions</p>
            </button>
          </span>
        </div>

        <nav className="d-flex m-2  flex-wrap justify-content-start">
          <button
            style={{ background: "#6b728e" }}
            className="text-center col-2 border rounded-3"
            onClick={() => {
              setFood(listFood);
            }}
          >
            <h5 className="text-white">All</h5>
          </button>
          {listCategories.map(({ name, id }) => {
            return (
              <button
                key={id}
                style={{ background: "#6b728e" }}
                className="text-center col-2 border rounded-3"
                onClick={() => {
                  setSelectedCategories(name);
                }}
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
            <LoadingFoodCard />
          </>
        ) : (
          <div className="row">
            {food.map((i) => {
              return (
                <div className="col-6 col-lg-3 col-md-4 col-sm-6" key={i.id}>
                  <FoodCard food={i} />
                </div>
              );
            })}
          </div>
        )}
        {/* <FoodCard food={food[0]} /> */}
      </main>
      <div>
        <div>{toggleEdit && <EditFoodForm />}</div>
      </div>
      <div>{toggleAction && <ActionCategories />}</div>
      <div>
        {toggleForm && <AddForm toggle={{ sendDataToParent: setToggleForm }} />}
      </div>

      <div className="position-absolute " style={{ border: "no-border" }}>
        <button
          style={{
            color: "#6c738f",
            border: "no-border",
            bottom: "10px",
            right: "10px",
            background: "transparent",
          }}
          className=" position-fixed"
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
