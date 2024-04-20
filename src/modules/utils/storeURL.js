import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodCard from "./FoodCard";
import AddForm from "./AddForm";
import EditFoodForm from "./EditFoodForm";
import LoadingFoodCard from "./LoadingFoodCard";
import ActionCategories from "../../categories/components/ActionCategories";
import ViewFoodCard from "./ViewFoodCard";
import { useFoods } from "../Core/action";
import { useCategories } from "../../categories/core/action";
import { storeToggleAction } from "../../categories/core/slice";
import Select from "react-select";
import { SlCloudUpload, SlOptions } from "react-icons/sl";

function FoodParent() {
  const [toggleForm, setToggleForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [optionForSelect, setOptionForSelect] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(null);
  const dispatch = useDispatch();

  //* Refactored
  const { foodList, toggleView, toggleEdit } = useSelector(
    (state) => state.foodList
  );
  const { categories, toggleAction } = useSelector((state) => state.category);
  const { fetchList, filterByCategory, searchFood } = useFoods();
  const { fetchCategories } = useCategories();

  const categoriesOptions = () => {
    const initialState = [{ value: "all", label: "All" }];
    categories.forEach((item) => {
      initialState.push({ value: item.name, label: item.name });
    });
    return initialState;
  };

  useEffect(() => {
    fetchCategories();
    fetchList();
    setOptionForSelect(categoriesOptions());
  }, []);

  useEffect(() => {
    if (foodList) {
      setLoading(false);
    }
  }, [foodList]);

  return (
    <div className="">
      <header>
        <div
          className=" p-2 text-center text-white m-2 rounded-3 fw-bold"
          style={{ background: "#6c738f" }}
        >
          Food List
        </div>

        <nav className="d-flex m-2  flex-wrap justify-content-start">
          <Select
            options={optionForSelect}
            value={selectedCategories}
            onChange={(selectedCategories) => {
              setSelectedCategories(selectedCategories);
              if (selectedCategories.label === "All") {
                fetchList();
              } else {
                filterByCategory(selectedCategories.label);
              }
            }}
          />
          <button
            className="border text-align-center text-dark rounded-3"
            onClick={() => {
              dispatch(storeToggleAction(!toggleAction));
            }}
          >
            <SlOptions />
          </button>
          <div className="d-flex w-75">
            <input
              type="text"
              className="ms-1 p-2 w-100  form-control form-input position-relative"
              placeholder="Search anything..."
              onChange={(e) => {
                searchFood(e.target.value);
              }}
            ></input>
          </div>
        </nav>
      </header>

      <main className="container position-relative">
        {loading ? (
          <>
            <LoadingFoodCard />
          </>
        ) : (
          <div className="row">
            {foodList.map((food) => {
              return (
                <div className="col-6 col-lg-3 col-md-4 col-sm-6" key={food.id}>
                  <FoodCard food={food} />
                </div>
              );
            })}
          </div>
        )}
      </main>
      <div>{toggleEdit && <EditFoodForm />}</div>
      <div>{toggleView && <ViewFoodCard />}</div>
      <div>{toggleAction && <ActionCategories />}</div>
      <div>
        {toggleForm && <AddForm toggle={{ sendDataToParent: setToggleForm }} />}
      </div>

      <button className="position-fixed bg-white text-dark no-border rounded-3 end-0 bottom-0 p-2">
        <SlCloudUpload
          onClick={() => {
            setToggleForm(!toggleForm);
          }}
        />
      </button>
    </div>
  );
}

export default FoodParent;
