import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategories } from "../../Food/Core/addCategories";
import getFoodCategories from "../../Food/Core/getFoodCategories";
import {
  storeCategories,
  storeToggleAction,
} from "../../Food/Core/allCategoriesSlice";

export default function AddCategoriesFood() {
  //initial state
  const initCategories = {
    name: "",
  };
  const dispatch = useDispatch();

  //states
  const [newCategories, setNewCategories] = useState(initCategories);
  const pattern = /^(?=.*[A-Za-z\s])[A-Za-z\s]{4,}$/;
  const [validInput, setValidInput] = useState(false);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");

  const handleSubmit = async () => {
    refetchCategories();
    addCategories(newCategories, token);
    dispatch(storeToggleAction(false));
    refetchCategories();
  };

  const refetchCategories = async () => {
    try {
      const result = await getFoodCategories(token);
      dispatch(storeCategories(result.data));
    } catch (error) {}
  };

  return (
    <>
      <div className="form-group w-100">
        <label className="fw-bold p-1">Enter The New Categories</label>
        {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
        <input
          type="text"
          className="form-control"
          placeholder="New Categories"
          onChange={(e) => {
            setNewCategories({ ...newCategories, name: e.target.value });
            if (pattern.test(e.target.value) === true) {
              setValidInput(true);
            } else {
              setValidInput(false);
            }
          }}
        />
        <div className="mt-1">
          <p className="m-0">• Enter at least 4 letters.</p>
          <p className="m-0">• Only alphabet allows.</p>
          <p className="m-0">• Enter a valid name.</p>
        </div>
        {validInput ? (
          <button className=" mt-1 btn btn-primary" onClick={handleSubmit}>
            Submit form
          </button>
        ) : (
          <button disabled className="mt-1 btn btn-primary">
            Submit Form
          </button>
        )}
      </div>
    </>
  );
}
