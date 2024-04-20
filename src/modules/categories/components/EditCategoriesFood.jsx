import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCategories } from "../core/action";
import { storeToggleEditCategory } from "../core/slice";

export default function EditCategoriesFood() {
  const dispatch = useDispatch();
  const [ID, setID] = useState(null);
  const [payload, setPayload] = useState({ name: "" });
  const { updateCategory, fetchCategories } = useCategories();
  const { categories } = useSelector((state) => state.category);
  return (
    <div>
      <div className="form-group">
        <label className="fw-bold mt-1">
          Select The Categories You Want To Delete
        </label>

        <select
          id="inputState"
          className="form-control"
          onChange={(e) => {
            categories.forEach(({ name, id }) => {
              if (name === e.target.value) {
                setID(id);
              }
            });
          }}
        >
          <option value="" disabled selected hidden>
            Choose...
          </option>
          {categories.map(({ name }) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label for="inputPrice fw-bold">New Categories</label>
        {/* <input type="password" class="form-control" id="inputPassword4" placeholder="Password"> */}
        <input
          type="text"
          className="form-control"
          placeholder="New Categories"
          onChange={(e) => {
            setPayload({ ...payload, name: e.target.value });
          }}
        />
      </div>

      <button
        className=" mt-1 btn btn-primary"
        onClick={() => {
          updateCategory(ID, payload);
          fetchCategories();
          dispatch(storeToggleEditCategory(false));
        }}
      >
        Submit Changes
      </button>
    </div>
  );
}
