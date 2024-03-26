import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ActionCategories() {
  /**
   * * get all the categories
   *  ? display all the method for edit add delete
   */

  //states
  const listCategories = useSelector(
    (state) => state.allCategory.listCategories
  );
  const [selectedMethod, setSelectedMethod] = useState("");
  const method = ["Edit", "Add", "Delete"];

  //useEffects
  useEffect(() => {
    console.log(selectedMethod);
  }, [selectedMethod]);

  return (
    <div
      className="add-form d-flex justify-content-center flex-column position-absolute col-9 p-3 rounded-2 ms-3"
      style={{ top: "15%", right: "10%" }}
    >
      <h3 className="text-white">Action Categories</h3>
      <div class="form-group d-flex">
        <label className="col-2  text-center pt-1 fw-bold">Method</label>
        <select
          id="inputState"
          className="form-control"
          onChange={(e) => {
            setSelectedMethod(e.target.value);
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
    </div>
  );
}
