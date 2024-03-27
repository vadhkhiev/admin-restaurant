import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddCategoriesFood from "./CategoriesComponent/AddCategoriesFood";
import EditCategoriesFood from "./CategoriesComponent/EditCategoriesFood";
import DeleteCategoriesFood from "./CategoriesComponent/DeleteCategoriesFood";

export default function ActionCategories() {
  /**
   * * get all the categories
   *  ? display all the method for edit add delete
   */

  //initial state
  const [stateEdit, setStateEdit] = useState(false);
  const [stateAdd, setStateAdd] = useState(false);
  const [stateDelete, setStateDelete] = useState(false);
  //states
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const [selectedMethod, setSelectedMethod] = useState("");
  const method = ["Edit", "Add", "Delete"];

  //useEffects

  return (
    <div
      className="add-form d-flex justify-content-center flex-column position-absolute col-9 p-3 rounded-2 ms-3"
      style={{ top: "15%", right: "10%" }}
    >
      <h3 className="text-white">Action Categories</h3>
      <div className="form-group d-flex">
        <label className="col-2  text-center pt-1 fw-bold">Method</label>
        <select
          id="inputState"
          className="form-control"
          onChange={(e) => {
            if (e.target.value == "Edit") {
              setStateEdit(true);
              setStateAdd(false);
              setStateDelete(false);
            } else if (e.target.value == "Delete") {
              setStateEdit(false);
              setStateAdd(false);
              setStateDelete(true);
            } else if (e.target.value == "Add") {
              setStateEdit(false);
              setStateAdd(true);
              setStateDelete(false);
            }
          }}
        >
          <option selected disabled hidden>
            Choose...
          </option>
          {method.map((p) => {
            return (
              <option value={p} key={p}>
                {p}
              </option>
            );
          })}
        </select>
      </div>

      {/**Form  */}
      <div>{stateAdd && <AddCategoriesFood />} </div>
      <div>{stateEdit && <EditCategoriesFood />} </div>
      <div>{stateDelete && <DeleteCategoriesFood />} </div>
    </div>
  );
}
